import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SideForm } from '../models/side-form';
import { ListEntityService } from '../services/list-entity.service';
import { LoadingService } from '../services/loading.service';
import { ToastService } from '../services/toast.service';

export class ListComponent<T> {
  title!: string;
  entityList$!: Observable<T[]>;
  selectedEntity!: T;
  error$ = new Subject<boolean>();
  sideForm: SideForm = new SideForm(false, 'create');
  loadingErrorMessage!: string;

  constructor(
    private readonly toastService: ToastService,
    private readonly loadingService: LoadingService,
    private readonly listEntityService: ListEntityService<T>,
    private readonly translateService: TranslateService,
    private readonly titleService: Title,
    private readonly entityName: string
  ) {
    this.loadingService.start();
    this.setPageTitle();
    this.setLoadingErrorMessage();
    this.fetchEntityList();
  }

  private setPageTitle(): void {
    this.translateService
      .get(`${this.entityName}.title`)
      .subscribe((translation) => (this.title = translation));
    this.titleService.setTitle(`${environment.title} - ${this.title}`);
  }

  private setLoadingErrorMessage(): void {
    this.translateService
      .get('loading.errors.listLoading', {
        entity: this.title.toLowerCase()
      })
      .subscribe((translation) => (this.loadingErrorMessage = translation));
  }

  private fetchEntityList(): void {
    this.entityList$ = this.listEntityService.list().pipe(
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

  openCreateForm(): void {
    this.sideForm.type = 'create';
    this.sideForm.open();
  }

  openUpdateForm(entity: T): void {
    this.selectedEntity = entity;

    this.sideForm.type = 'update';
    this.sideForm.open();
  }

  closeSideForm() {
    this.sideForm.close();
  }

  refresh(): void {
    this.fetchEntityList();
  }
}
