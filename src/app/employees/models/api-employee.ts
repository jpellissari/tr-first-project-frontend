import { Client } from 'src/app/clients/models/client';
import { JobPosition } from 'src/app/job-positions/models/job-position';
import { EmployeeType } from './employee-type';

export interface ApiEmployee {
  id: string;
  client: Client;
  jobPosition: JobPosition;
  nationalIdentity: string;
  type: EmployeeType;
  name: string;
  birthdate: string;
  active: boolean;
  salary: number;
}
