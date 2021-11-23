import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoadingService } from 'src/app/shared/loading.service';

import { ToastService } from 'src/app/shared/toast.service';
import { Client } from '../models/client';
import { ClientsService } from '../service/clients.service';

type SideForm = {
  status: boolean;
  type: 'create' | 'update';
};

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  sideForm!: SideForm;
  selectedClient!: Client;
  clients$!: Observable<Client[]>;
  error$ = new Subject<boolean>();

  constructor(
    private readonly clientsService: ClientsService,
    private readonly toastService: ToastService,
    private readonly loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.fetchClients();
    this.initSideForm();
  }

  private fetchClients() {
    this.loadingService.start();

    this.clients$ = this.clientsService.list().pipe(
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

  openUpdateForm(client: Client): void {
    this.selectedClient = client;

    this.sideForm = {
      status: true,
      type: 'update'
    };
  }

  closeSideForm() {
    this.sideForm.status = false;
  }

  refresh() {
    this.fetchClients();
  }
}
