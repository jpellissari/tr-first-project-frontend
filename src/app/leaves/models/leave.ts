import { parse } from 'date-fns';
import { Client } from 'src/app/clients/models/client';
import { Employee, IEmployee } from 'src/app/employees/models/employee';
import { IApiLeave } from './api-leave';
import { LeaveType, LeaveTypes } from './leave-type';
import { Type } from './type';

export interface ILeave {
  id: string;
  client: Client;
  employee: IEmployee;
  leaveType: LeaveType;
  leaveDate: Date;
  numberDays?: number;
  returnDate?: Date;
  type?: Type;
}

export class Leave {
  id: string;
  client: Client;
  employee: IEmployee;
  leaveType: LeaveType;
  leaveDate: Date;
  numberDays?: number;
  returnDate?: Date;
  type?: Type;

  private constructor({
    id,
    client,
    employee,
    leaveType,
    leaveDate,
    numberDays,
    returnDate,
    type
  }: ILeave) {
    this.id = id;
    this.client = client;
    this.employee = employee;
    this.leaveType = leaveType;
    this.leaveDate = leaveDate;
    this.numberDays = numberDays;
    this.returnDate = returnDate;
    this.type = type;
  }

  static create(data: IApiLeave): ILeave {
    const employee = Employee.create(data.employee);
    const leaveType = LeaveTypes.filter(
      (type) => type.type === data.leaveType
    )[0];
    const leaveDate = parse(data.leaveDate, 'dd/MM/yyyy', new Date());
    const returnDate = parse(data.returnDate, 'dd/MM/yyyy', new Date());
    const type = Object.values(Type).filter((type) => type === data.type)[0];

    return new Leave({
      ...data,
      employee,
      leaveType,
      leaveDate,
      returnDate,
      type
    });
  }
}
