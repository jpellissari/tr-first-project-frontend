import { DatePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { parse } from 'date-fns';

import { Client } from 'src/app/clients/models/client';
import { ClientsService } from 'src/app/clients/service/clients.service';
import { JobPosition } from 'src/app/job-positions/models/job-position';
import { JobPositionsService } from 'src/app/job-positions/service/job-positions.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { CpfCnpjValidator } from 'src/app/shared/validators/cpf-cnpj-validator';
import { Employee } from '../../models/employee';
import { EmployeesService } from '../../services/employees.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit, OnChanges, OnDestroy {
  @Input() employee!: Employee;
  @Output() formClosedEvent = new EventEmitter<void>();
  @Output() employeeUpdatedEvent = new EventEmitter<void>();
  submitted: boolean = false;
  form!: FormGroup;
  clients$!: Observable<Client[]>;
  jobs$!: Observable<JobPosition[]>;
  error$ = new Subject<boolean>();
  clientOptions: Array<{ value: string; text: string }> = [];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly employeesService: EmployeesService,
    private readonly clientsService: ClientsService,
    private readonly jobPositionsService: JobPositionsService,
    private readonly toastService: ToastService,
    private readonly loading: LoadingService,
    private readonly translate: TranslateService,
    private readonly datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.clients$ = this.clientsService.list();
    this.jobs$ = this.jobPositionsService.list();
    this.form = this.createForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.employee.firstChange) {
      this.form.patchValue({
        id: changes.employee.currentValue.id,
        name: changes.employee.currentValue.name,
        clientId: changes.employee.currentValue.client.id,
        jobPositionId: changes.employee.currentValue.jobPosition.id,
        birthdate: changes.employee.currentValue.birthdate,
        nationalIdentity: changes.employee.currentValue.nationalIdentity,
        salary: changes.employee.currentValue.salary,
        active: changes.employee.currentValue.active,
        type: changes.employee.currentValue.type.toString().toLowerCase()
      });
    }
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      id: [{ value: this.employee.id, disabled: true }, Validators.required],
      name: [
        this.employee.name,
        [Validators.required, Validators.minLength(3), Validators.maxLength(60)]
      ],
      clientId: [this.employee.client.id, Validators.required],
      jobPositionId: [this.employee.jobPosition.id, Validators.required],
      birthdate: [this.employee.birthdate, Validators.required],
      nationalIdentity: [
        this.employee.nationalIdentity,
        [Validators.required, CpfCnpjValidator.validate]
      ],
      salary: [this.employee.salary, Validators.required],
      active: [this.employee.active, Validators.required],
      type: [this.employee.type.toString().toLowerCase(), Validators.required]
    });
  }

  ngOnDestroy(): void {
    this.resetForm();
  }

  closeForm(): void {
    this.resetForm();
    this.formClosedEvent.emit();
  }

  hasError(field: string) {
    return this.form.get(field)?.errors;
  }

  deleteEmployee(): void {
    this.employeesService.delete(this.employee.id).subscribe(
      (success) => {
        this.translate
          .get('employees.deleteEmployee.success')
          .subscribe((message: string) => this.handleSuccess(message));
      },
      (error) => {
        this.handleError(error);
      }
    );
  }

  updateEmployee() {
    this.submitted = true;
    this.loading.start();
    if (this.form.valid) {
      const { id, ...body } = this.form.getRawValue();
      body.birthdate = this.datePipe.transform(body.birthdate, 'dd/MM/yyyy');
      this.employeesService.save(body, id).subscribe(
        (success) => {
          this.translate
            .get('employees.editEmployee.success')
            .subscribe((message: string) => this.handleSuccess(message));
        },
        (error) => {
          this.handleError(error);
        }
      );
    }
    this.loading.stop();
  }

  private resetForm(): void {
    this.loading.stop();
    this.submitted = false;
    this.form.reset();
  }

  private handleSuccess(message: string): void {
    this.resetForm();
    this.toastService.showSuccessMessage(message);
    this.employeeUpdatedEvent.emit();
  }

  private handleError(error: any): void {
    this.error$.next(true);
    this.loading.stop();

    console.error('Error editing employee', error);

    if (error.status === 409) {
      this.translate
        .get('employees.addEmployee.errors.conflit')
        .subscribe((message: string) =>
          this.toastService.showErrorMessage(message)
        );
    } else {
      this.toastService.showErrorMessage(error);
    }
  }
}
