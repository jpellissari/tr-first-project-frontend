import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CpfError } from './cpf-error';
import { MaxLengthError } from './max-length-error';
import { MinLengthError } from './min-length-error';
import { RequiredFieldError } from './required-error';
import { ValidationError } from './validation-error';

type CreateValidationError = {
  errors: ValidationErrors | null;
  label: string;
  translateService: TranslateService;
};

@Injectable({ providedIn: 'root' })
export class ValidationErrorFactory {
  create({
    errors,
    label,
    translateService
  }: CreateValidationError): ValidationError | null {
    if (errors?.required) {
      return new RequiredFieldError(translateService, label);
    }
    if (errors?.minlength) {
      return new MinLengthError(
        translateService,
        label,
        errors?.minlength?.requiredLength
      );
    }
    if (errors?.maxlength) {
      return new MaxLengthError(
        translateService,
        label,
        errors?.maxlength?.requiredLength
      );
    }
    if (errors?.cpf) {
      return new CpfError(translateService, label);
    }

    return null;
  }
}
