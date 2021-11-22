import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoadingService } from 'src/app/shared/loading.service';

import { ToastService } from 'src/app/shared/toast.service';
import { Client } from '../models/client';
import { ClientsService } from '../service/clients.service';

type FormType = {
  type: 'create' | 'update';
};

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  sideForm: boolean;
  formType: FormType = { type: 'create' };
  selectedClient!: Client;
  clients$!: Observable<Client[]>;
  error$ = new Subject<boolean>();

  constructor(
    private readonly clientsService: ClientsService,
    private readonly toastService: ToastService,
    private readonly loadingService: LoadingService
  ) {
    this.sideForm = false;
  }

  ngOnInit() {
    this.loadingService.start();

    this.clients$ = this.clientsService.list().pipe(
      tap(() => this.loadingService.stop()),
      catchError(() => {
        return this.handleError();
      })
    );
  }

  handleError() {
    this.loadingService.stop();
    this.error$.next(true);
    this.toastService.showErrorMessage(
      'Erro ao carregar lista de clientes. Tente mais tarde.'
    );
    return EMPTY;
  }

  openForm(form: 'update' | 'create'): void {
    this.formType.type = form;
    this.sideForm = true;
  }

  openUpdateForm(client: Client): void {
    this.formType.type = 'update';
    this.selectedClient = client;
    this.sideForm = true;
  }

  closeForm(): void {
    this.sideForm = false;
  }

  refresh() {
    this.ngOnInit();
  }
}
