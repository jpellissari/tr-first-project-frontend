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
import { Subject } from 'rxjs';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Client } from '../models/client';
import { ClientsService } from '../service/clients.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit, OnDestroy, OnChanges {
  @Input() client!: Client;
  @Output() formClosedEvent = new EventEmitter<void>();
  @Output() clientUpdated = new EventEmitter<void>();
  submitted: boolean = false;
  form!: FormGroup;
  error$ = new Subject<boolean>();
  confirmation = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly clientsService: ClientsService,
    private readonly toastService: ToastService,
    private readonly loading: LoadingService
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
    this.resetForm();
  }

  closeForm(): void {
    this.resetForm();
    this.formClosedEvent.emit();
  }

  hasError(field: string) {
    return this.form.get(field)?.errors;
  }

  updateClient() {
    this.submitted = true;
    this.loading.start();
    if (this.form.valid) {
      this.clientsService.update(this.form.getRawValue()).subscribe(
        (success) => {
          this.handleSuccess('Client Updated!');
        },
        (error) => {
          this.handleError(error);
        }
      );
    }
  }

  openConfirmation() {
    this.confirmation = true;
  }

  deleteClient() {
    this.loading.start();
    this.clientsService.delete(this.form.getRawValue().id).subscribe(
      (success) => {
        this.handleSuccess('Client deleted!');
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

  private resetForm(): void {
    this.loading.stop();
    this.submitted = false;
    this.form.reset();
  }

  private handleSuccess(message: string): void {
    this.resetForm();
    this.toastService.showSuccessMessage(message);
    this.clientUpdated.emit();
    this.formClosedEvent.emit();
    this.clientUpdated.emit();
  }

  private handleError(error: any): void {
    this.error$.next(true);
    this.loading.stop();
    this.toastService.showErrorMessage(error);
  }
}
