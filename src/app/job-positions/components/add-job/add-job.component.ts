import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

import { LoadingService } from 'src/app/shared/services/loading.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { JobPositionsService } from '../../service/job-positions.service';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss']
})
export class AddJobComponent implements OnDestroy {
  @Output() formClosedEvent = new EventEmitter<void>();
  @Output() jobCreated = new EventEmitter<void>();
  submitted: boolean = false;
  form: FormGroup;
  error$ = new Subject<boolean>();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly jobsService: JobPositionsService,
    private readonly toastService: ToastService,
    private readonly loading: LoadingService
  ) {
    this.form = this.createForm();
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      name: [
        null,
        [Validators.required, Validators.minLength(3), Validators.maxLength(60)]
      ]
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

  createJob() {
    this.submitted = true;
    this.loading.start();
    if (this.form.valid) {
      const { name } = this.form.value;
      this.jobsService.save({ name }).subscribe(
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
    this.toastService.showSuccessMessage('Cargo Criado');
    this.jobCreated.emit();
  }

  private handleError(errors: any[]): void {
    this.error$.next(true);
    this.loading.stop();
    errors.forEach((error) =>
      this.toastService.showErrorMessage(`${error.field} ${error.error}`)
    );
  }
}
