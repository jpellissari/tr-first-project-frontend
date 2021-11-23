import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { ListEmployeesComponent } from './components/list-employees/list-employees.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NzTableModule } from 'ng-zorro-antd/table';

@NgModule({
  declarations: [
    AddEmployeeComponent,
    EditEmployeeComponent,
    ListEmployeesComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    NgxSpinnerModule,
    NzTableModule
  ]
})
export class EmployeesModule {}
