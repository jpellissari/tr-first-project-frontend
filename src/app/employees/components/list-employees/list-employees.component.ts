import { Component, OnInit } from '@angular/core';
import { Observable, Subject, EMPTY } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Client } from 'src/app/clients/models/client';
import { ClientsService } from 'src/app/clients/service/clients.service';
import { SideForm } from 'src/app/shared/models/side-form';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Employee } from '../../models/employee';
import { EmployeesService } from '../../services/employees.service';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.scss']
})
export class ListEmployeesComponent implements OnInit {
  sideForm!: SideForm;
  selectedEmployee!: Employee;
  employees$!: Observable<Employee[]>;
  error$ = new Subject<boolean>();

  constructor(
    private readonly employeesService: EmployeesService,
    private readonly toastService: ToastService,
    private readonly loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.fetchEmployees();
    this.initSideForm();
  }

  private fetchEmployees() {
    this.loadingService.start();

    this.employees$ = this.employeesService.list().pipe(
      tap(() => this.loadingService.stop()),
      catchError(() => {
        return this.handleError();
      })
    );
  }

  private initSideForm() {
    this.sideForm = {
      status: false,
      type: 'create'
    };
  }

  handleError() {
    this.loadingService.stop();
    this.error$.next(true);
    this.toastService.showErrorMessage(
      'Erro ao carregar lista de clientes. Tente mais tarde.'
    );
    return EMPTY;
  }

  openCreateForm(): void {
    this.sideForm = {
      status: true,
      type: 'create'
    };
  }

  openUpdateForm(employee: Employee): void {
    this.selectedEmployee = employee;

    this.sideForm = {
      status: true,
      type: 'update'
    };
  }

  closeSideForm() {
    this.sideForm.status = false;
  }

  refresh() {
    this.fetchEmployees();
  }
}
