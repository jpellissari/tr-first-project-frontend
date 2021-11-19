import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.scss']
})
export class NewClientComponent implements OnDestroy {
  @Output() formClosedEvent: EventEmitter<void>;
  submitted: boolean;
  form: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
    this.formClosedEvent = new EventEmitter<void>();
    this.submitted = false;
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
    this.submitted = false;
    this.form.reset();
  }

  closeForm(): void {
    this.formClosedEvent.emit();
  }

  hasError(field: string) {
    return this.form.get(field)?.errors;
  }

  createClient() {
    this.submitted = true;
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
