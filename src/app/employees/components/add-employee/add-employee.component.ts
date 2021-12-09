import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { ClientsService } from 'src/app/clients/service/clients.service';
import { JobPositionsService } from 'src/app/job-positions/service/job-positions.service';

import { LoadingService } from 'src/app/shared/services/loading/loading.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { EmployeesService } from '../../services/employees.service';
import { CpfCnpjValidator } from 'src/app/shared/validators/cpf-cnpj-validator';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Client } from 'src/app/clients/models/client';
import { map, take, tap } from 'rxjs/operators';
import { JobPosition } from 'src/app/job-positions/models/job-position';
import { FormHelperService } from 'src/app/shared/services/form-helper.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html'
})
export class AddEmployeeComponent implements OnDestroy {
  @Output() formClosed = new EventEmitter<void>();
  @Output() employeeCreated = new EventEmitter<void>();

  form: FormGroup;

  error$ = new Subject<boolean>();
  clients$: Observable<Client[]> = of();
  jobs$: Observable<JobPosition[]> = of();

  private subscriptionDestroyer: Subject<void> = new Subject();

  constructor(
    public formHelper: FormHelperService,
    private readonly formBuilder: FormBuilder,
    private readonly employeesService: EmployeesService,
    private readonly clientsService: ClientsService,
    private readonly jobPositionsService: JobPositionsService,
    private readonly toastService: ToastService,
    private readonly loading: LoadingService,
    private readonly translate: TranslateService,
    private datePipe: DatePipe
  ) {
    this.form = this.createForm();
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      name: [
        null,
        [Validators.required, Validators.minLength(3), Validators.maxLength(60)]
      ],
      clientId: [null, Validators.required],
      jobPositionId: [null, Validators.required],
      birthdate: [null, Validators.required],
      nationalIdentity: [
        null,
        [Validators.required, CpfCnpjValidator.validate]
      ],
      salary: [null, Validators.required],
      active: [false, Validators.required],
      type: [null, Validators.required]
    });
  }

  ngOnDestroy(): void {
    this.subscriptionDestroyer.next();
    this.subscriptionDestroyer.complete();
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

  createEmployee() {
    if (this.form.valid) {
      this.loading.start();

      const body = this.form.value;
      body.birthdate = this.datePipe.transform(body.birthdate, 'dd/MM/yyyy');

      this.employeesService.create(body).subscribe(
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
    this.loading.stop();
    this.translate
      .get('employees.forms.add.success')
      .pipe(take(1))
      .subscribe((message: string) =>
        this.toastService.showSuccessMessage(message)
      );

    this.employeeCreated.emit();
  }

  private handleError(error: any): void {
    this.loading.stop();

    if (error.status === 409) {
      this.translate
        .get('employees.forms.errors.conflit')
        .subscribe((message: string) =>
          this.toastService.showErrorMessage(message)
        );
    } else {
      this.toastService.showErrorMessage(error);
    }
  }
}
