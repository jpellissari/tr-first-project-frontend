import { DatePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { addDays } from 'date-fns';
import { Subject, Observable, of } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { Client } from 'src/app/clients/models/client';
import { ClientsService } from 'src/app/clients/service/clients.service';
import { Employee } from 'src/app/employees/models/employee';
import { EmployeesService } from 'src/app/employees/services/employees.service';
import { FormHelperService } from 'src/app/shared/services/form-helper.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { LeaveType, LeaveTypes } from '../../models/leave-type';
import { LeavesService } from '../../services/leaves.service';
import { Type } from '../../models/type';
import { ApiSimplifiedLeave } from '../../models/api-simplified-leave';
import { ILeave } from '../../models/leave';

@Component({
  selector: 'app-edit-leave',
  templateUrl: './edit-leave.component.html',
  styleUrls: ['./edit-leave.component.scss']
})
export class EditLeaveComponent implements OnInit, OnChanges {
  @Input() leaveId: string = '';
  @Output() formClosed = new EventEmitter<void>();
  @Output() leaveUpdated = new EventEmitter<void>();

  leave: ILeave = {} as ILeave;
  form: FormGroup = {} as FormGroup;
  leaveTypes: LeaveType[];
  leaveTypesThatAllowReturnDate: LeaveType[];
  types: Type[];
  isFieldVisible = {
    leaveType: false,
    returnDate: false,
    numberDays: false,
    type: false
  };

  error$ = new Subject<boolean>();
  clients$!: Observable<Client[]>;
  employees$!: Observable<Employee[]>;

  constructor(
    public readonly formHelper: FormHelperService,
    private readonly formBuilder: FormBuilder,
    private readonly clientsService: ClientsService,
    private readonly leavesService: LeavesService,
    private readonly employeesService: EmployeesService,
    private readonly toastService: ToastService,
    private readonly loadingService: LoadingService,
    private readonly translateService: TranslateService,
    private datePipe: DatePipe
  ) {
    this.types = Object.values(Type);
    this.leaveTypes = LeaveTypes;
    this.leaveTypesThatAllowReturnDate = LeaveTypes.filter(
      (type) => type.numberDays
    );
  }

  ngOnInit(): void {
    this.form = this.createForm();
    this.clients$ = this.clientsService.list();
  }

  async ngOnChanges(): Promise<void> {
    this.loadingService.start();
    this.leavesService
      .findById(this.leaveId)
      .pipe(
        take(1),
        tap(() => this.loadingService.stop())
      )
      .subscribe((leave) => {
        this.leave = leave;
        this.updateForm(leave);
      });
  }

  private updateForm(leave: ILeave): void {
    this.form.patchValue({
      id: leave.id,
      clientId: leave.client.id,
      employeeId: leave.employee.id,
      leaveType: leave.leaveType,
      leaveDate: leave.leaveDate,
      numberDays: leave.numberDays,
      returnDate: leave.returnDate,
      type: leave.type
    });
  }

  onNumberOfDaysChange(numberOfDays: number) {
    this.form.patchValue({
      returnDate: addDays(this.form.value.leaveDate, numberOfDays)
    });
  }

  onLeaveDateChange(date?: Date) {
    this.isFieldVisible.leaveType = true;

    if (!date) {
      this.form.get('leaveType')?.reset(null);
    }
    date
      ? (this.isFieldVisible.leaveType = true)
      : (this.isFieldVisible.leaveType = false);
  }

  onClientChange(clientId: string) {
    this.employees$ = this.employeesService.list(clientId);
  }

  onLeaveTypeChange(leaveType: LeaveType) {
    if (this.leaveTypesThatAllowReturnDate.includes(leaveType)) {
      this.showReturnDate();
      this.form.patchValue({
        numberDays: leaveType.numberDays,
        returnDate: addDays(
          this.form.value.leaveDate,
          leaveType.numberDays || 0
        )
      });
      this.isFieldVisible.numberDays = true;
    } else {
      this.hideReturnDate();
      this.isFieldVisible.numberDays = false;
    }

    leaveType.type === 'VACATION'
      ? this.enableNumberDays()
      : this.disableNumberDays();

    if (leaveType.type === 'WORK_INJURY') {
      this.form.get('type')?.enable();
      this.isFieldVisible.type = true;
    } else {
      this.form.get('type')?.disable();
      this.isFieldVisible.type = false;
    }
  }

  searchClient(name: string): void {
    this.clients$.pipe(
      map((clients) =>
        clients.filter(
          (client) => client.name.toLocaleLowerCase().indexOf(name) > -1
        )
      )
    );
  }

  searchEmployee(name: string): void {
    this.employees$.pipe(
      map((employees) =>
        employees.filter(
          (employee) => employee.name.toLocaleLowerCase().indexOf(name) > -1
        )
      )
    );
  }

  deleteLeave(): void {
    this.leavesService
      .delete(this.leave.id)
      .pipe(take(1))
      .subscribe(
        (success) => {
          const message = this.getTranslationMessageFor(
            'leaves.forms.delete.success'
          );
          this.handleSuccess(message);
        },
        (error) => {
          this.handleError(error);
        }
      );
  }

  private getTranslationMessageFor(key: string): string {
    return this.translateService.instant(key);
  }

  updateLeave(): void {
    if (this.form.valid) {
      this.loadingService.start();

      const body = this.form.value;
      body.employeeId = body.employee.id;
      body.leaveType = body.leaveType.type;
      body.leaveDate = this.datePipe.transform(body.leaveDate, 'dd/MM/yyyy');

      this.leavesService.create(body).subscribe(
        (success) => {
          this.handleSuccess('teste');
        },
        (error) => {
          this.handleError(error);
        }
      );
    }
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      id: [{ value: null, disabled: true }, Validators.required],
      clientId: [{ value: null, disabled: true }, Validators.required],
      employeeId: [{ value: null, disabled: true }, Validators.required],
      leaveType: [{ value: null, disabled: true }, Validators.required],
      leaveDate: [null, Validators.required],
      numberDays: [
        { value: null, disabled: true },
        { updateOn: 'blur' },
        [Validators.required, Validators.min(0)]
      ],
      returnDate: [{ value: null, disabled: true }],
      type: [null, Validators.required]
    });
  }

  private showReturnDate(): void {
    this.isFieldVisible.returnDate = true;
  }

  private hideReturnDate(): void {
    this.isFieldVisible.returnDate = false;
  }

  private disableNumberDays(): void {
    this.form.get('numberDays')?.disable();
  }

  private enableNumberDays(): void {
    this.form.get('numberDays')?.enable();
  }

  private handleSuccess(message: string): void {
    this.loadingService.stop();
    this.toastService.showSuccessMessage(message);

    this.leaveUpdated.emit();
    this.formClosed.emit();
  }

  private handleError(error: any): void {
    this.loadingService.stop();

    if (error.error.message === 'Already has TERMINATION.') {
      this.translateService
        .get('leaves.forms.errors.termination', {
          name: this.form.value.employee.name
        })
        .pipe(take(1))
        .subscribe((message) => this.toastService.showErrorMessage(message));
    } else if (error.error.message === 'Already has CONTRIBUTORS_DEATH.') {
      this.translateService
        .get('leaves.forms.errors.death', {
          name: this.form.value.employee.name
        })
        .pipe(take(1))
        .subscribe((message) => this.toastService.showErrorMessage(message));
    } else {
      this.toastService.showErrorMessage(error);
    }
  }
}
