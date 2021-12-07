import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxMaskModule } from 'ngx-mask';
import { NgxCurrencyModule } from 'ngx-currency';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

import { EmployeesRoutingModule } from './employees-routing.module';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { ListEmployeesComponent } from './components/list-employees/list-employees.component';
import { SharedModule } from '../shared/shared.module';
import { EmployeesComponent } from './components/employees/employees.component';

@NgModule({
  declarations: [
    AddEmployeeComponent,
    EditEmployeeComponent,
    ListEmployeesComponent,
    EmployeesComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    SharedModule,
    NzSelectModule,
    NzDatePickerModule,
    NgxMaskModule.forRoot(),
    NgxCurrencyModule,
    NzCheckboxModule
  ]
})
export class EmployeesModule {}
