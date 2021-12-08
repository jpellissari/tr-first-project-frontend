import { format } from 'date-fns';
import { LeaveType } from './leave-type';

type ICreateLeaveDTO = {
  clientId: string;
  employeeId: string;
  leaveType: LeaveType;
  leaveDate: Date;
  numberDays: number;
  type: string;
};

export class NewLeave {
  clientId: string;
  employeeId: string;
  leaveType: string;
  leaveDate: string;
  numberDays: number;
  type: string;

  private constructor({
    clientId,
    employeeId,
    leaveType,
    leaveDate,
    numberDays,
    type
  }: NewLeave) {
    this.clientId = clientId;
    this.employeeId = employeeId;
    this.leaveType = leaveType;
    this.leaveDate = leaveDate;
    this.numberDays = numberDays;
    this.type = type;
  }

  static create(data: ICreateLeaveDTO): NewLeave {
    const leaveDate = format(data.leaveDate, 'dd/MM/yyyy');
    const leaveType = data.leaveType.type;

    return new NewLeave({ ...data, leaveDate, leaveType });
  }
}
