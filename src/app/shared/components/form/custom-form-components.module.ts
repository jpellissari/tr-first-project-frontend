import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { DeleteButtonComponent } from './delete-button/delete-button.component';
import { InputComponent } from './input/input.component';
import { ValidationComponent } from './validation/validation.component';
import { BaseInputComponent } from './base-input/base-input.component';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    InputComponent,
    ValidationComponent,
    DeleteButtonComponent,
    BaseInputComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzPopconfirmModule,
    NzIconModule,
    NgxMaskModule
  ],
  exports: [
    InputComponent,
    DeleteButtonComponent,
    ValidationComponent,
    BaseInputComponent
  ]
})
export class CustomFormComponentsModule {}
