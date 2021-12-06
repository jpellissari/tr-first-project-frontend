import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { addDays } from 'date-fns';
import { Client } from 'src/app/clients/models/client';
import { ClientsService } from 'src/app/clients/service/clients.service';
import { Employee } from 'src/app/employees/models/employee';
import { EmployeesService } from 'src/app/employees/services/employees.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { LeaveType, LeaveTypes } from '../../models/leave-type';
import { Type } from '../../models/type';
import { LeavesService } from '../../services/leaves.service';

@Component({
  selector: 'app-add-leave',
  templateUrl: './add-leave.component.html',
  styleUrls: ['./add-leave.component.scss']
})
export class AddLeaveComponent implements OnInit {
  @Output() formClosed = new EventEmitter<void>();
  @Output() leaveCreated = new EventEmitter<void>();
  submitted: boolean = false;
  form: FormGroup;
  leaveTypes: LeaveType[];
  leaveTypesThatAllowReturnDate: LeaveType[];
  types: Type[];
  error$ = new Subject<boolean>();
  clients$!: Observable<Client[]>;
  employees$!: Observable<Employee[]>;
  isFieldVisible = {
    leaveType: false,
    returnDate: false,
    numberDays: false,
    type: false
  };

  formFields = 'returnDate';

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly clientsService: ClientsService,
    private readonly leavesService: LeavesService,
    private readonly employeesService: EmployeesService,
    private readonly toastService: ToastService,
    private readonly loadingService: LoadingService,
    private readonly translateService: TranslateService,
    private datePipe: DatePipe
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
      employee: [{ value: null }, Validators.required],
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

  hasError(field: string) {
    return this.form.get(field)?.errors;
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
    this.submitted = true;
    if (this.form.valid) {
      this.loadingService.start();
      const body = this.form.value;
      body.employeeId = body.employee.id;
      body.leaveType = body.leaveType.type;
      body.leaveDate = this.datePipe.transform(body.leaveDate, 'dd/MM/yyyy');
      this.leavesService.create(body).subscribe(
        (success) => {
          this.handleSuccess();
        },
        (error) => {
          this.handleError(error);
        }
      );
    }
  }

  private handleSuccess(): void {
    this.loadingService.stop();
    this.form.reset();
    this.toastService.showSuccessMessage('Leave created');
    this.leaveCreated.emit();
  }

  private handleError(error: any): void {
    this.error$.next(true);
    this.loadingService.stop();

    if (error.status === 409) {
      this.translateService
        .get('leaves.addEmployee.errors.conflit')
        .subscribe((message: string) =>
          this.toastService.showErrorMessage(message)
        );
    }

    if (error.error.message === 'Already has TERMINATION.') {
      this.toastService.showErrorMessage(
        `O funcionário ${this.form.value.employee.name} possui um afastamento do tipo 'demissão' e não permite novos afastamentos`
      );
    }

    if (error.error.message === 'Already has CONTRIBUTORS_DEATH.') {
      this.toastService.showErrorMessage(
        `O funcionário ${this.form.value.employee.name} possui um afastamento do tipo 'morte' e não permite novos afastamentos.`
      );
    }

    this.toastService.showErrorMessage(error);
  }
}
