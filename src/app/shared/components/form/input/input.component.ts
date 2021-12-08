import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormHelperService } from 'src/app/shared/services/form-helper.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() fieldId: string = '';
  @Input() control: AbstractControl | null = null;
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = 'text';

  constructor(public formHelper: FormHelperService) {}
}
