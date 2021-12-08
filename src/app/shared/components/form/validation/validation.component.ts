import {
  Component,
  ChangeDetectionStrategy,
  OnChanges,
  Input
} from '@angular/core';
import { ValidationError } from 'src/app/shared/errors/validation-errors';

@Component({
  selector: 'app-validation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss']
})
export class ValidationComponent implements OnChanges {
  @Input() validationErrors: ValidationError | null = null;

  errorMessage: string | null = null;

  ngOnChanges(): void {
    this.validationErrors ? this.getErrorMessage() : (this.errorMessage = null);
  }

  getErrorMessage(): void {
    const error = this.validationErrors;

    if (error) {
      error
        .buildMessage()
        .subscribe((message) => (this.errorMessage = message));
    }
  }
}
