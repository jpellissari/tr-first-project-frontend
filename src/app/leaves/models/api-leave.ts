import { Client } from 'src/app/clients/models/client';
import { ApiEmployee } from 'src/app/employees/models/api-employee';
import { IEmployee } from 'src/app/employees/models/employee';

export interface IApiLeave {
  id: string;
  client: Client;
  employee: ApiEmployee;
  leaveType: string;
  leaveDate: string;
  numberDays: number;
  returnDate: string;
  type: string;
}
