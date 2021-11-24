import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    TranslateModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NzTableModule,
    NzPopconfirmModule,
    NzIconModule
  ]
})
export class SharedModule {}
