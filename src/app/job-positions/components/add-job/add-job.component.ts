import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs/operators';

import { LoadingService } from 'src/app/shared/services/loading/loading.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { JobPositionsService } from '../../service/job-positions.service';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html'
})
export class AddJobComponent {
  @Output() formClosed = new EventEmitter<void>();
  @Output() jobCreated = new EventEmitter<void>();

  form: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly translateService: TranslateService,
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

  hasError(field: string) {
    return this.form.get(field)?.errors;
  }

  createJob() {
    if (this.form.valid) {
      this.loading.start();

      const { name } = this.form.value;
      this.jobsService.create({ name }).subscribe(
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
    this.translateService
      .get('jobs.forms.add.success')
      .pipe(take(1))
      .subscribe((message) => this.toastService.showSuccessMessage(message));

    this.jobCreated.emit();
  }

  private handleError(errors: any[]): void {
    this.loading.stop();
    errors.forEach((error) =>
      this.toastService.showErrorMessage(`${error.field} ${error.error}`)
    );
  }
}
