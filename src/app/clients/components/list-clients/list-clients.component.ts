import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Client } from '../../models/client';

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html'
})
export class ListClientsComponent {
  @Input() clients: Client[];
  @Output() showClient: EventEmitter<Client>;

  constructor() {
    this.clients = [];
    this.showClient = new EventEmitter<Client>();
  }
}
