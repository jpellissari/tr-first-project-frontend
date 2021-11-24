import { Client } from 'src/app/clients/models/client';
import { JobPosition } from 'src/app/job-positions/models/job-position';

export enum EmployeeType {
  EMPLOYEE = 'EMPLOYEE',
  INTERN = 'INTERN',
  PARTNER = 'PARTNER'
}

export interface Employee {
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
