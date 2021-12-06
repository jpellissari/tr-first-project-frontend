import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { ValidationError } from './validation-errors';

export class MinLengthError implements ValidationError {
  private field: string;
  private requiredLength: number;

  constructor(
    private translateService: TranslateService,
    field: string,
    requiredLength: number
  ) {
    this.field = field;
    this.requiredLength = requiredLength;
  }

  buildMessage(): Observable<string> {
    return this.translateService.get('form.errors.minLength', {
      field: this.field,
      requiredLength: this.requiredLength
    });
  }
}
