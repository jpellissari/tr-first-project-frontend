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
import { Observable, of, Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { Client } from 'src/app/clients/models/client';
import { ClientsService } from 'src/app/clients/service/clients.service';
import { JobPosition } from 'src/app/job-positions/models/job-position';
import { JobPositionsService } from 'src/app/job-positions/service/job-positions.service';
import { FormHelperService } from 'src/app/shared/services/form-helper.service';
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
export class EditEmployeeComponent implements OnInit, OnChanges {
  @Input() employee: Employee = {} as Employee;
  @Output() formClosed = new EventEmitter<void>();
  @Output() employeeUpdated = new EventEmitter<void>();

  submitted: boolean = false;
  form: FormGroup = {} as FormGroup;

  jobs$: Observable<JobPosition[]> = of();
  clients$: Observable<Client[]> = of();

  constructor(
    public readonly formHelper: FormHelperService,
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
    this.form = this.createForm();
    this.clients$ = this.clientsService.list();
    this.jobs$ = this.jobPositionsService.list();
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

  searchClient(value: string): void {
    this.clients$ = this.clientsService
      .list()
      .pipe(
        map((clients) =>
          clients.filter(
            (client) => client.name.toLocaleLowerCase().indexOf(value) > -1
          )
        )
      );
  }

  searchJob(value: string): void {
    this.jobs$ = this.jobPositionsService
      .list()
      .pipe(
        map((jobs) =>
          jobs.filter((job) => job.name.toLocaleLowerCase().indexOf(value) > -1)
        )
      );
  }

  deleteEmployee(): void {
    this.employeesService
      .delete(this.employee.id)
      .pipe(take(1))
      .subscribe(
        (success) => {
          const message = this.getTranslationMessageFor(
            'employees.forms.delete.success'
          );
          this.handleSuccess(message);
        },
        (error) => {
          this.handleError(error);
        }
      );
  }

  updateEmployee() {
    if (this.form.valid) {
      this.loading.start();

      const employee = this.form.getRawValue();
      employee.birthdate = this.datePipe.transform(
        employee.birthdate,
        'dd/MM/yyyy'
      );

      this.employeesService
        .update(employee)
        .pipe(take(1))
        .subscribe(
          (success) => {
            const message = this.getTranslationMessageFor(
              'employees.forms.edit.success'
            );
            this.handleSuccess(message);
          },
          (error) => {
            this.handleError(error);
          }
        );
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

  private getTranslationMessageFor(key: string): string {
    return this.translate.instant(key);
  }

  private handleSuccess(message: string): void {
    this.loading.stop();
    this.toastService.showSuccessMessage(message);

    this.employeeUpdated.emit();
    this.formClosed.emit();
  }

  private handleError(error: any): void {
    this.loading.stop();

    if (error.status === 409) {
      this.translate
        .get('employees.forms.errors.conflit')
        .pipe(take(1))
        .subscribe((message: string) =>
          this.toastService.showErrorMessage(message)
        );
    } else {
      this.toastService.showErrorMessage(error);
    }
  }
}
