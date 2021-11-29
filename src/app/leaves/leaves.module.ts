import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddLeaveComponent } from './components/add-leave/add-leave.component';
import { EditLeaveComponent } from './components/edit-leave/edit-leave.component';
import { ListLeavesComponent } from './components/list-leaves/list-leaves.component';
import { SharedModule } from '../shared/shared.module';
import { LeavesRoutingModule } from './leaves-routing.module';

@NgModule({
  declarations: [AddLeaveComponent, EditLeaveComponent, ListLeavesComponent],
  imports: [CommonModule, LeavesRoutingModule, SharedModule]
})
export class LeavesModule {}
