import { Component, DoCheck, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { MinLengthError } from 'src/app/shared/errors/validation-errors/min-length-error';
import { RequiredFieldError } from 'src/app/shared/errors/validation-errors/required-error';
import { MaxLengthError } from '../../../errors/validation-errors/max-length-error';
import { ValidationError } from '../../../errors/validation-errors/validation-error';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements DoCheck {
  @Input() fieldId: string = '';
  @Input() control: AbstractControl | null = null;
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = 'text';

  validationErrors: ValidationError | null = null;

  constructor(private readonly translateService: TranslateService) {}

  ngDoCheck(): void {
    if (this.control) {
      this.validationErrors =
        this.control.touched && this.control.invalid ? this.buildError() : null;
    }
  }

  toControl(abstractControl: AbstractControl | null): FormControl {
    return abstractControl as FormControl;
  }

  private buildError(): ValidationError | null {
    if (this.control) {
      if (this.control['errors']?.required) {
        return new RequiredFieldError(this.translateService, this.label);
      }
      if (this.control['errors']?.minlength) {
        return new MinLengthError(
          this.translateService,
          this.label,
          this.control['errors']?.minlength?.requiredLength
        );
      }
      if (this.control['errors']?.maxlength) {
        return new MaxLengthError(
          this.translateService,
          this.label,
          this.control['errors']?.maxlength?.requiredLength
        );
      }
    }
    return null;
  }
}
