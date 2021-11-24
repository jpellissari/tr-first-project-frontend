import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ListClientsComponent } from './components/list-clients/list-clients.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { ClientsService } from './service/clients.service';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ListClientsComponent, AddClientComponent, EditClientComponent],
  imports: [CommonModule, ClientsRoutingModule, SharedModule],
  providers: [ClientsService]
})
export class ClientsModule {}
