import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { NewClient } from '../../models/new-client';
import { ClientsService } from '../../service/clients.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html'
})
export class AddClientComponent implements OnDestroy {
  @Output() formClosedEvent = new EventEmitter<void>();
  @Output() clientCreated = new EventEmitter<void>();

  form: FormGroup;

  private subscriptionDestroyer: Subject<void> = new Subject();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly clientsService: ClientsService,
    private readonly loadingService: LoadingService,
    private readonly toastService: ToastService,
    private readonly transalateService: TranslateService
  ) {
    this.form = this.createForm();
  }

  ngOnDestroy(): void {
    this.subscriptionDestroyer.next();
    this.subscriptionDestroyer.complete();
  }

  closeForm(): void {
    this.form.reset();
    this.formClosedEvent.emit();
  }

  createClient() {
    if (this.form.valid) {
      this.loadingService.start();

      const newClient = this.createRequestBody(this.form.value.name);
      this.clientsService
        .create(newClient)
        .pipe(takeUntil(this.subscriptionDestroyer))
        .subscribe(
          (success) => {
            this.handleSuccess();
          },
          (error) => {
            this.handleError(error);
          }
        );
    }
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      name: [
        null,
        [Validators.required, Validators.minLength(3), Validators.maxLength(60)]
      ]
    });
  }

  private createRequestBody(name: string): NewClient {
    return NewClient.create(name);
  }

  private handleSuccess(): void {
    this.loadingService.stop();
    this.showSuccessToaster();
    this.clientCreated.emit();
  }

  private showSuccessToaster(): void {
    this.transalateService
      .get('clients.form.add.success')
      .pipe(takeUntil(this.subscriptionDestroyer))
      .subscribe((message) => this.toastService.showSuccessMessage(message));
  }

  private handleError(error: any): void {
    this.loadingService.stop();
    this.toastService.showErrorMessage(error);
  }
}
