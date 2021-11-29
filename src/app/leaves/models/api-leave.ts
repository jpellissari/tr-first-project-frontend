import { Client } from 'src/app/clients/models/client';
import { ApiEmployee } from 'src/app/employees/models/api-employee';
import { LeaveType } from './leave-type';

type Type =
  | 'CONTRIBUTORS_DEATH'
  | 'MATERNITY_LEAVE'
  | 'PATERNITY_LEAVE'
  | 'WORK_INJURY'
  | 'VACATION'
  | 'TERMINATION'
  | 'OTHERS';

export interface ApiLeave {
  id: string;
  client: Client;
  employee: ApiEmployee;
  leaveType: LeaveType;
  leaveDate: string;
  numberDays: number;
  returnDate: string;
  type: Type;
}
