import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoadingService } from 'src/app/shared/loading.service';

import { ToastService } from 'src/app/shared/toast.service';
import { Client } from '../models/client';
import { ClientsService } from '../service/clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  sideForm: boolean;
  clients$!: Observable<Client[]>;
  error$ = new Subject<boolean>();

  constructor(
    private readonly clientsService: ClientsService,
    private readonly toastService: ToastService,
    private readonly loading: LoadingService
  ) {
    this.sideForm = false;
  }

  ngOnInit() {
    this.loading.start();

    this.clients$ = this.clientsService.list().pipe(
      tap(() => this.loading.stop()),
      catchError(() => {
        return this.handleError();
      })
    );
  }

  openForm(): void {
    this.sideForm = true;
  }

  closeForm(): void {
    this.sideForm = false;
  }

  handleError() {
    this.loading.stop();
    this.error$.next(true);
    this.toastService.showErrorMessage(
      'Erro ao carregar lista de clientes. Tente mais tarde.'
    );
    return EMPTY;
  }
}
