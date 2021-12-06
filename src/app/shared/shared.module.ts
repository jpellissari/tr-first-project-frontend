import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { LoadingComponent } from './components/loading/loading.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { InputComponent } from './components/form/input/input.component';
import { ValidationComponent } from './components/form/validation/validation.component';

@NgModule({
  declarations: [
    LoadingComponent,
    TopbarComponent,
    InputComponent,
    ValidationComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    NgxSpinnerModule,
    ReactiveFormsModule
  ],
  exports: [
    TranslateModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NzTableModule,
    NzPopconfirmModule,
    NzIconModule,
    LoadingComponent,
    TopbarComponent,
    InputComponent,
    ValidationComponent
  ]
})
export class SharedModule {}
