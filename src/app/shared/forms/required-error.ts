import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { ValidationError } from './validation-errors';

export class RequiredFieldError implements ValidationError {
  private field: string;

  constructor(private translateService: TranslateService, field: string) {
    this.field = field;
  }

  buildMessage(): Observable<string> {
    return this.translateService.get('form.errors.required', {
      field: this.field
    });
  }
}
