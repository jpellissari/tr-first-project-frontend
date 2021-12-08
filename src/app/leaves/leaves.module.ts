import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddLeaveComponent } from './components/add-leave/add-leave.component';
import { EditLeaveComponent } from './components/edit-leave/edit-leave.component';
import { ListLeavesComponent } from './components/list-leaves/list-leaves.component';
import { SharedModule } from '../shared/shared.module';
import { LeavesRoutingModule } from './leaves-routing.module';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { LeavesComponent } from './components/leaves/leaves.component';

@NgModule({
  declarations: [
    AddLeaveComponent,
    EditLeaveComponent,
    ListLeavesComponent,
    LeavesComponent
  ],
  imports: [
    CommonModule,
    LeavesRoutingModule,
    SharedModule,
    NzSelectModule,
    NzDatePickerModule
  ]
})
export class LeavesModule {}
