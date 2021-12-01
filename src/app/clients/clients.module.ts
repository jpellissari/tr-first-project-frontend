import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ListClientsComponent } from './components/list-clients/list-clients.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { SharedModule } from '../shared/shared.module';
import { ClientsComponent } from './components/clients/clients.component';

@NgModule({
  declarations: [
    ListClientsComponent,
    AddClientComponent,
    EditClientComponent,
    ClientsComponent
  ],
  imports: [CommonModule, ClientsRoutingModule, SharedModule]
})
export class ClientsModule {}
