import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { TranslateService } from '@ngx-translate/core';

import { LoadingService } from 'src/app/shared/services/loading.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ListComponent } from 'src/app/shared/components/list-component';
import { Employee } from '../../models/employee';
import { EmployeesService } from '../../services/employees.service';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.scss']
})
export class ListEmployeesComponent extends ListComponent<Employee> {
  constructor(
    employeesService: EmployeesService,
    toastService: ToastService,
    loadingService: LoadingService,
    translateService: TranslateService,
    titleService: Title
  ) {
    super(
      toastService,
      loadingService,
      employeesService,
      translateService,
      titleService,
      'employees'
    );
  }
}
