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
import { Subject } from 'rxjs';

import { LoadingService } from 'src/app/shared/services/loading.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { JobPosition } from '../../models/job-position';
import { JobPositionsService } from '../../service/job-positions.service';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.scss']
})
export class EditJobComponent implements OnInit, OnChanges, OnDestroy {
  @Input() job!: JobPosition;
  @Output() formClosedEvent = new EventEmitter<void>();
  @Output() jobUpdated = new EventEmitter<void>();
  submitted: boolean = false;
  form!: FormGroup;
  error$ = new Subject<boolean>();
  confirmation = false;

  constructor(
    private readonly formBuilder: FormBuilder,
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

  updateJob() {
    this.submitted = true;
    this.loading.start();
    if (this.form.valid) {
      const { id, name } = this.form.getRawValue();
      this.jobsService.save({ name }, id).subscribe(
        (success) => {
          this.handleSuccess('Job Updated!');
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
        this.handleSuccess('Job deleted!');
      },
      (error) => {
        this.handleError(error);
      }
    );
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

  private resetForm(): void {
    this.loading.stop();
    this.submitted = false;
    this.form.reset();
  }

  private handleSuccess(message: string): void {
    this.resetForm();
    this.toastService.showSuccessMessage(message);
    this.jobUpdated.emit();
    this.formClosedEvent.emit();
    this.jobUpdated.emit();
  }

  private handleError(errors: any[]): void {
    this.error$.next(true);
    this.loading.stop();
    errors.forEach((error) =>
      this.toastService.showErrorMessage(`${error.field} ${error.error}`)
    );
  }
}
