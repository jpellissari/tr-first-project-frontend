import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { ListEmployeesComponent } from './components/list-employees/list-employees.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AddEmployeeComponent,
    EditEmployeeComponent,
    ListEmployeesComponent
  ],
  imports: [CommonModule, EmployeesRoutingModule, SharedModule]
})
export class EmployeesModule {}
