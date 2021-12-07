import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Employee } from '../../models/employee';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html'
})
export class ListEmployeesComponent {
  @Input() employees: Employee[] = [];
  @Output() showEmployee: EventEmitter<Employee> = new EventEmitter<Employee>();
}
