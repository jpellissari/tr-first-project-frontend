import { Injectable } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormHelperService {
  castToFormControl(abstractControl: AbstractControl | null): FormControl {
    return abstractControl as FormControl;
  }
}
