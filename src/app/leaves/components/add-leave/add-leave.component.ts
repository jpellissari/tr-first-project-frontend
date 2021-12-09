import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { addDays } from 'date-fns';
import { Client } from 'src/app/clients/models/client';
import { ClientsService } from 'src/app/clients/service/clients.service';
import { Employee } from 'src/app/employees/models/employee';
import { EmployeesService } from 'src/app/employees/services/employees.service';
import { LoadingService } from 'src/app/shared/services/loading/loading.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { LeaveType, LeaveTypes } from '../../models/leave-type';
import { Type } from '../../models/type';
import { LeavesService } from '../../services/leaves.service';
import { FormHelperService } from 'src/app/shared/services/form-helper.service';
import { NewLeave } from '../../models/new-leave';

@Component({
  selector: 'app-add-leave',
  templateUrl: './add-leave.component.html'
})
export class AddLeaveComponent implements OnInit {
  @Output() formClosed = new EventEmitter<void>();
  @Output() leaveCreated = new EventEmitter<void>();

  form: FormGroup;
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
    private readonly translateService: TranslateService
  ) {
    this.form = this.createForm();
    this.types = Object.values(Type);
    this.leaveTypes = LeaveTypes;
    this.leaveTypesThatAllowReturnDate = LeaveTypes.filter(
      (type) => type.numberDays
    );
  }

  ngOnInit(): void {
    this.clients$ = this.clientsService.list();
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

  createLeave(): void {
    if (this.form.valid) {
      this.loadingService.start();

      const newLeaveBody = NewLeave.create(this.form.value);

      this.leavesService.create(newLeaveBody).subscribe(
        (success) => {
          this.handleSuccess();
        },
        (error) => {
          this.handleError(error);
        }
      );
    }
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

  private createForm(): FormGroup {
    return this.formBuilder.group({
      clientId: [null, Validators.required],
      employee: [null, Validators.required],
      leaveType: [null, Validators.required],
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

  private handleSuccess(): void {
    this.loadingService.stop();

    this.translateService
      .get('leaves.forms.add.success')
      .pipe(take(1))
      .subscribe((message) => this.toastService.showSuccessMessage(message));

    this.leaveCreated.emit();
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
      this.toastService.showErrorMessage(error);
    } else if (error.error.message === 'Already has CONTRIBUTORS_DEATH.') {
      this.translateService
        .get('leaves.forms.errors.death', {
          name: this.form.value.employee.name
        })
        .pipe(take(1))
        .subscribe((message) => this.toastService.showErrorMessage(message));
      this.toastService.showErrorMessage(error);
    } else {
      this.toastService.showErrorMessage(error);
    }
  }
}
