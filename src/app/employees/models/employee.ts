import { Client } from 'src/app/clients/models/client';
import { JobPosition } from 'src/app/job-positions/models/job-position';

export interface Employee {
  id: string;
  client: Client;
  jobPosition: JobPosition;
  nationalIdentity: string;
  type: 'employee' | 'partner' | 'intern';
  name: string;
  birthdate: Date;
  active: boolean;
  salary: number;
}
