import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddLeaveComponent } from './components/add-leave/add-leave.component';
import { EditLeaveComponent } from './components/edit-leave/edit-leave.component';
import { ListLeavesComponent } from './components/list-leaves/list-leaves.component';



@NgModule({
  declarations: [
    AddLeaveComponent,
    EditLeaveComponent,
    ListLeavesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LeavesModule { }
