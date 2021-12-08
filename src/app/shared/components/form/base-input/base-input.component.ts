import { Component, DoCheck, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ValidationErrorFactory } from 'src/app/shared/errors/validation-errors';

import { ValidationError } from '../../../errors/validation-errors/validation-error';

@Component({
  selector: 'app-base-input',
  templateUrl: './base-input.component.html',
  styleUrls: ['./base-input.component.scss']
})
export class BaseInputComponent implements DoCheck {
  @Input() fieldId: string = '';
  @Input() control: AbstractControl | null = null;
  @Input() label: string = '';
  @Input() placeholder: string = '';

  validationErrors: ValidationError | null = null;

  constructor(
    private readonly translateService: TranslateService,
    private readonly validationErrorFactory: ValidationErrorFactory
  ) {}

  ngDoCheck(): void {
    if (this.control) {
      this.validationErrors =
        this.control.touched && this.control.invalid ? this.buildError() : null;
    }
  }

  private buildError(): ValidationError | null {
    return this.validationErrorFactory.create({
      errors: this.control!.errors,
      label: this.label,
      translateService: this.translateService
    });
  }
}
