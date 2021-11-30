import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [LoadingComponent],
  imports: [CommonModule, TranslateModule, NgxSpinnerModule],
  exports: [
    TranslateModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NzTableModule,
    NzPopconfirmModule,
    NzIconModule,
    LoadingComponent
  ]
})
export class SharedModule {}
