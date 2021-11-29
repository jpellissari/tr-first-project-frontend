import {
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  Output
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ClientsService } from 'src/app/clients/service/clients.service';
import { JobPositionsService } from 'src/app/job-positions/service/job-positions.service';

import { LoadingService } from 'src/app/shared/services/loading.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { EmployeesService } from '../../services/employees.service';
import { CpfCnpjValidator } from 'src/app/shared/validators/cpf-cnpj-validator';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnDestroy {
  @Output() formClosedEvent = new EventEmitter<void>();
  @Output() employeeCreated = new EventEmitter<void>();
  submitted: boolean = false;
  form: FormGroup;
  error$ = new Subject<boolean>();
  clientOptions: Array<{ value: string; text: string }> = [];
  jobOptions: Array<{ value: string; text: string }> = [];

  constructor(
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
    this.resetForm();
  }

  closeForm(): void {
    this.resetForm();
    this.formClosedEvent.emit();
  }

  hasError(field: string) {
    return this.form.get(field)?.errors;
  }

  searchClient(value: string): void {
    this.clientsService.list().subscribe((clients) => {
      const listOfOption: Array<{ value: string; text: string }> = [];

      clients
        .filter((client) =>
          client.name.toLowerCase().includes(value.toLowerCase())
        )
        .forEach((client) => {
          listOfOption.push({
            value: client.id,
            text: client.name
          });
        });

      this.clientOptions = listOfOption;
    });
  }

  searchJob(value: string): void {
    this.jobPositionsService.list().subscribe((jobs) => {
      const listOfOption: Array<{ value: string; text: string }> = [];

      jobs
        .filter((job) => job.name.toLowerCase().includes(value.toLowerCase()))
        .forEach((job) => {
          listOfOption.push({
            value: job.id,
            text: job.name
          });
        });

      this.jobOptions = listOfOption;
    });
  }

  createEmployee() {
    this.submitted = true;
    this.loading.start();
    if (this.form.valid) {
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
    this.loading.stop();
  }

  private resetForm(): void {
    this.loading.stop();
    this.submitted = false;
    this.form.reset();
  }

  private handleSuccess(): void {
    this.resetForm();
    this.toastService.showSuccessMessage('Employee created');
    this.employeeCreated.emit();
  }

  private handleError(error: any): void {
    this.error$.next(true);
    this.loading.stop();

    if (error.status === 409) {
      this.translate
        .get('employees.addEmployee.errors.conflit')
        .subscribe((message: string) =>
          this.toastService.showErrorMessage(message)
        );
    }

    this.toastService.showErrorMessage(error);
  }
}
