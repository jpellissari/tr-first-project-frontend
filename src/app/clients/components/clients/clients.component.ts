import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { TranslateService } from '@ngx-translate/core';

import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { LoadingService } from 'src/app/shared/services/loading/loading.service';
import { Client } from '../../models/client';
import { Observable, Subject, EMPTY, of } from 'rxjs';
import { tap, catchError, takeUntil } from 'rxjs/operators';
import { SideForm, SideFormType } from 'src/app/shared/models/side-form';
import { environment } from 'src/environments/environment';
import { ClientsService } from '../../service/clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html'
})
export class ClientsComponent implements OnInit, OnDestroy {
  title: string = 'Clients';
  selectedClient: Client = {} as Client;
  sideForm: SideForm = new SideForm(false, 'create');
  loadingErrorMessage: string = 'Error';

  error$: Subject<boolean> = new Subject<boolean>();
  clients$: Observable<Client[]> = of();

  private subscriptionDestroyer: Subject<void> = new Subject();

  constructor(
    private readonly toastService: ToastService,
    private readonly loadingService: LoadingService,
    private readonly clientService: ClientsService,
    private readonly translateService: TranslateService,
    private readonly titleService: Title
  ) {}

  ngOnInit(): void {
    this.loadingService.start();
    this.setPageTitle();
    this.setLoadingErrorMessage();
    this.fetchClients();
  }

  ngOnDestroy(): void {
    this.subscriptionDestroyer.next();
    this.subscriptionDestroyer.complete();
  }

  openCreateForm(): void {
    this.sideForm.type = 'create';
    this.sideForm.open();
  }

  openUpdateForm(client: Client): void {
    this.selectedClient = client;

    this.sideForm.type = 'update';
    this.sideForm.open();
  }

  handleClientCreated(): void {
    this.refresh();
    this.sideForm.close();
  }

  refresh(): void {
    this.fetchClients();
  }

  private setPageTitle(): void {
    this.translateService
      .get('clients.title')
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

  private fetchClients(): void {
    this.clients$ = this.clientService.list().pipe(
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
