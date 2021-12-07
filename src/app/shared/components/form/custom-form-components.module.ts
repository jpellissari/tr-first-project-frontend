import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { DeleteButtonComponent } from './delete-button/delete-button.component';
import { InputComponent } from './input/input.component';
import { ValidationComponent } from './validation/validation.component';

@NgModule({
  declarations: [InputComponent, ValidationComponent, DeleteButtonComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzPopconfirmModule,
    NzIconModule
  ],
  exports: [InputComponent, DeleteButtonComponent, ValidationComponent]
})
export class CustomFormComponentsModule {}
