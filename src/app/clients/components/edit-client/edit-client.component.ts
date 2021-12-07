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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Client } from '../../models/client';
import { ClientsService } from '../../service/clients.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html'
})
export class EditClientComponent implements OnInit, OnDestroy, OnChanges {
  @Input() client: Client = {} as Client;
  @Output() formClosed = new EventEmitter<void>();
  @Output() clientUpdated = new EventEmitter<void>();

  form: FormGroup = {} as FormGroup;

  private subscriptionDestroyer: Subject<void> = new Subject();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly translateService: TranslateService,
    private readonly clientsService: ClientsService,
    private readonly toastService: ToastService,
    private readonly loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.form = this.createForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.client.firstChange) {
      this.form.patchValue({
        id: changes.client.currentValue.id,
        name: changes.client.currentValue.name
      });
    }
  }

  ngOnDestroy(): void {
    this.subscriptionDestroyer.next();
    this.subscriptionDestroyer.complete();
  }

  updateClient() {
    if (this.form.valid) {
      this.loadingService.start();

      const client = this.createClient(this.form.getRawValue());
      this.clientsService
        .update(client)
        .pipe(takeUntil(this.subscriptionDestroyer))
        .subscribe(
          (success) => {
            const message = this.getSuccessMessage();
            this.handleSuccess(message);
          },
          (error) => {
            this.handleError(error);
          }
        );
    }
  }

  deleteClient() {
    this.loadingService.start();

    this.clientsService
      .delete(this.form.getRawValue().id)
      .pipe(takeUntil(this.subscriptionDestroyer))
      .subscribe(
        (success) => {
          const message = this.getDeleteSuccessMessage();
          this.handleSuccess(message);
        },
        (error) => {
          this.handleError(error);
        }
      );
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      id: [{ value: this.client.id, disabled: true }, Validators.required],
      name: [
        this.client.name,
        [Validators.required, Validators.minLength(3), Validators.maxLength(60)]
      ]
    });
  }

  private createClient(formValues: any): Client {
    const { id, name } = formValues;
    return Client.create({ id, name });
  }

  private getSuccessMessage(): string {
    return this.translateService.instant('clients.forms.edit.success');
  }

  private getDeleteSuccessMessage(): string {
    return this.translateService.instant('clients.forms.delete.success');
  }

  private handleSuccess(message: string): void {
    this.toastService.showSuccessMessage(message);
    this.clientUpdated.emit();
    this.formClosed.emit();
  }

  private handleError(error: any): void {
    this.loadingService.stop();
    this.toastService.showErrorMessage(error);
  }
}
