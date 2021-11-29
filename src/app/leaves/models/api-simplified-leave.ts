import { Client } from 'src/app/clients/models/client';
import { LeaveType } from './leave-type';

type Type =
  | 'contributors_death'
  | 'maternity_leave'
  | 'paternity_leave'
  | 'work_injury'
  | 'vacation'
  | 'termination'
  | 'others';

type SimplifiedEmployee = {
  id: string;
  name: string;
};

export interface ApiSimplifiedLeave {
  id: string;
  client: Client;
  employee: SimplifiedEmployee;
  leaveType: LeaveType;
  leaveDate: string;
  numberDays: number;
  returnDate: string;
  type: Type;
}
