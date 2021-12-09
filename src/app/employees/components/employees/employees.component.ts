import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Subject, Observable, of, EMPTY } from 'rxjs';
import { takeUntil, tap, catchError } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

import { environment } from 'src/environments/environment';
import { LoadingService } from 'src/app/shared/services/loading/loading.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { SideForm } from 'src/app/shared/models/side-form';
import { IEmployee } from '../../models/employee';
import { EmployeesService } from '../../services/employees.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html'
})
export class EmployeesComponent implements OnInit, OnDestroy {
  title: string = 'Employees';
  selectedEmployee: IEmployee = {} as IEmployee;
  sideForm: SideForm = new SideForm(false, 'create');
  loadingErrorMessage: string = 'Error';

  error$: Subject<boolean> = new Subject<boolean>();
  employees$: Observable<IEmployee[]> = of();

  private subscriptionDestroyer: Subject<void> = new Subject();

  constructor(
    private readonly toastService: ToastService,
    private readonly loadingService: LoadingService,
    private readonly employeeService: EmployeesService,
    private readonly translateService: TranslateService,
    private readonly titleService: Title
  ) {}

  ngOnInit(): void {
    this.setPageTitle();
    this.setLoadingErrorMessage();
    this.fetchEmployees();
  }

  ngOnDestroy(): void {
    this.subscriptionDestroyer.next();
    this.subscriptionDestroyer.complete();
  }

  openCreateForm(): void {
    this.sideForm.type = 'create';
    this.sideForm.open();
  }

  openUpdateForm(employee: IEmployee): void {
    this.selectedEmployee = employee;

    this.sideForm.type = 'update';
    this.sideForm.open();
  }

  handleEmployeeCreated(): void {
    this.refresh();
    this.sideForm.close();
  }

  refresh(): void {
    this.fetchEmployees();
  }

  private setPageTitle(): void {
    this.translateService
      .get('employees.title')
      .pipe(takeUntil(this.subscriptionDestroyer))
      .subscribe((translation) => (this.title = translation));
    this.titleService.setTitle(`${environment.title} - ${this.title}`);
  }

  private setLoadingErrorMessage(): void {
    this.translateService
      .get('loading.errors.listLoading', {
        entity: this.title.toLowerCase()
      })
      .pipe(takeUntil(this.subscriptionDestroyer))
      .subscribe((translation) => (this.loadingErrorMessage = translation));
  }

  private fetchEmployees(): void {
    this.loadingService.start();

    this.employees$ = this.employeeService.list().pipe(
      tap(() => this.loadingService.stop()),
      catchError(() => {
        return this.handleError(this.loadingErrorMessage);
      })
    );
  }

  private handleError(message: string) {
    this.loadingService.stop();
    this.error$.next(true);
    this.toastService.showErrorMessage(message);
    return EMPTY;
  }
}
