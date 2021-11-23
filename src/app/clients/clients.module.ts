import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxSpinnerModule } from 'ngx-spinner';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { ClientsRoutingModule } from './clients-routing.module';
import { ListClientsComponent } from './components/list-clients/list-clients.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { ClientsService } from './service/clients.service';
import { EditClientComponent } from './components/edit-client/edit-client.component';

@NgModule({
  declarations: [ListClientsComponent, AddClientComponent, EditClientComponent],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NzTableModule,
    NzPopconfirmModule,
    NzIconModule
  ],
  providers: [ClientsService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ClientsModule {}
