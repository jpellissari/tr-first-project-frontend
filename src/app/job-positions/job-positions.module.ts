import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxSpinnerModule } from 'ngx-spinner';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTableModule } from 'ng-zorro-antd/table';

import { JobPositionsRoutingModule } from './job-positions-routing.module';
import { ListJobComponent } from './components/list-job/list-job.component';

@NgModule({
  declarations: [ListJobComponent],
  imports: [
    CommonModule,
    JobPositionsRoutingModule,
    NgxSpinnerModule,
    NgxSpinnerModule,
    NzTableModule,
    NzPopconfirmModule,
    NzIconModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JobPositionsModule {}
