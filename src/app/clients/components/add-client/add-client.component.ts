import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ClientsService } from '../../service/clients.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnDestroy {
  @Output() formClosedEvent = new EventEmitter<void>();
  @Output() clientCreated = new EventEmitter<void>();
  submitted: boolean = false;
  form: FormGroup;
  error$ = new Subject<boolean>();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly clientsService: ClientsService,
    private readonly toastService: ToastService,
    private readonly loadingService: LoadingService
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

  createClient() {
    this.submitted = true;
    if (this.form.valid) {
      this.loadingService.start();
      this.clientsService.create(this.form.value.name).subscribe(
        (success) => {
          this.handleSuccess();
        },
        (error) => {
          this.handleError(error);
        }
      );
    }
  }

  private resetForm(): void {
    this.loadingService.stop();
    this.submitted = false;
    this.form.reset();
  }

  private handleSuccess(): void {
    this.resetForm();
    this.toastService.showSuccessMessage('Client created');
    this.clientCreated.emit();
  }

  private handleError(error: any): void {
    this.error$.next(true);
    this.loadingService.stop();
    this.toastService.showErrorMessage(error);
  }
}
