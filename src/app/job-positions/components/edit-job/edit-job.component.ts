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
import { Subject } from 'rxjs';

import { LoadingService } from 'src/app/shared/services/loading/loading.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { JobPosition } from '../../models/job-position';
import { JobPositionsService } from '../../service/job-positions.service';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html'
})
export class EditJobComponent implements OnInit, OnChanges {
  @Input() job: JobPosition = {} as JobPosition;
  @Output() formClosed = new EventEmitter<void>();
  @Output() jobUpdated = new EventEmitter<void>();

  submitted: boolean = false;
  form: FormGroup = {} as FormGroup;
  error$ = new Subject<boolean>();
  confirmation = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly translateService: TranslateService,
    private readonly jobsService: JobPositionsService,
    private readonly toastService: ToastService,
    private readonly loading: LoadingService
  ) {}

  ngOnInit(): void {
    this.form = this.createForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.job.firstChange) {
      this.form.patchValue({
        id: changes.job.currentValue.id,
        name: changes.job.currentValue.name
      });
    }
  }

  updateJob() {
    if (this.form.valid) {
      this.loading.start();
      this.jobsService.update(this.form.getRawValue()).subscribe(
        (success) => {
          const message = this.getTranslationMessageFor(
            'jobs.forms.edit.success'
          );
          this.handleSuccess(message);
        },
        (errors) => {
          console.log(errors);
          this.handleError(errors.error);
        }
      );
    }
  }

  openConfirmation() {
    this.confirmation = true;
  }

  deleteJob() {
    this.loading.start();
    this.jobsService.delete(this.form.getRawValue().id).subscribe(
      (success) => {
        const message = this.getTranslationMessageFor(
          'jobs.forms.delete.success'
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

  private createForm(): FormGroup {
    return this.formBuilder.group({
      id: [{ value: this.job.id, disabled: true }, Validators.required],
      name: [
        this.job.name,
        [Validators.required, Validators.minLength(3), Validators.maxLength(60)]
      ]
    });
  }

  private handleSuccess(message: string): void {
    this.loading.stop();
    this.toastService.showSuccessMessage(message);
    this.jobUpdated.emit();
    this.formClosed.emit();
  }

  private handleError(errors: any[]): void {
    this.loading.stop();
    errors.forEach((error) =>
      this.toastService.showErrorMessage(`${error.field} ${error.error}`)
    );
  }
}
