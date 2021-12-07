import { Client } from 'src/app/clients/models/client';
import { JobPosition } from 'src/app/job-positions/models/job-position';
import { EmployeeType } from './employee-type';

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
