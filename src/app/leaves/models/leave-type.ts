import { addDays } from 'date-fns';

export type LeaveType = {
  type: string;
  numberDays?: number;
};

export const LeaveTypes = [
  {
    type: 'CONTRIBUTORS_DEATH'
  },
  {
    type: 'MATERNITY_LEAVE',
    numberDays: 180
  },
  {
    type: 'PATERNITY_LEAVE',
    numberDays: 20
  },
  {
    type: 'WORK_INJURY'
  },
  {
    type: 'VACATION',
    numberDays: 1
  },
  {
    type: 'TERMINATION'
  },
  {
    type: 'OTHERS'
  }
];
