import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../models/client';
import { ClientsService } from '../service/clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent {
  sideForm: boolean;
  clients$: Observable<Client[]>;

  constructor(private readonly clientsService: ClientsService) {
    this.sideForm = false;
    this.clients$ = this.clientsService.list();
  }

  openForm(): void {
    this.sideForm = true;
  }

  closeForm(): void {
    this.sideForm = false;
  }
}
