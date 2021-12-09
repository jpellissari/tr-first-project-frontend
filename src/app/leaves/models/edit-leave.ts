import { format } from 'date-fns';

type ICreateLeaveDTO = {
  leaveId: string;
  leaveDate: Date;
  numberDays: number;
  type: string;
};

export class EditLeave {
  leaveId: string;
  leaveDate: string;
  numberDays: number;
  type: string;

  private constructor({ leaveId, leaveDate, numberDays, type }: EditLeave) {
    this.leaveId = leaveId;
    this.leaveDate = leaveDate;
    this.numberDays = numberDays;
    this.type = type;
  }

  static create(data: ICreateLeaveDTO): EditLeave {
    const leaveDate = format(data.leaveDate, 'dd/MM/yyyy');

    return new EditLeave({ ...data, leaveDate });
  }
}
