import { parse } from 'date-fns';
import { Client } from 'src/app/clients/models/client';
import { JobPosition } from 'src/app/job-positions/models/job-position';
import { ApiEmployee } from './api-employee';
import { EmployeeType } from './employee-type';

export interface IEmployee {
  id: string;
  client: Client;
  jobPosition: JobPosition;
  nationalIdentity: string;
  type: EmployeeType;
  name: string;
  birthdate: Date;
  active: boolean;
  salary: number;
}

export class Employee implements IEmployee {
  public id: string;
  public client: Client;
  public jobPosition: JobPosition;
  public nationalIdentity: string;
  public type: EmployeeType;
  public name: string;
  public birthdate: Date;
  public active: boolean;
  public salary: number;

  private constructor({
    id,
    client,
    jobPosition,
    nationalIdentity,
    type,
    name,
    birthdate,
    active,
    salary
  }: IEmployee) {
    this.id = id;
    this.client = client;
    this.jobPosition = jobPosition;
    this.nationalIdentity = nationalIdentity;
    this.type = type;
    this.name = name;
    this.birthdate = birthdate;
    this.active = active;
    this.salary = salary;
  }

  static create(employeeData: ApiEmployee): Employee {
    const birthdate = parse(employeeData.birthdate, 'dd/MM/yyyy', new Date());
    const client = Client.create(employeeData.client);

    return new Employee({ ...employeeData, birthdate, client });
  }
}
