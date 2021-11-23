import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxSpinnerModule } from 'ngx-spinner';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './main-component/clients.component';
import { NewClientComponent } from './new-client/new-client.component';
import { ClientsService } from './service/clients.service';
import { EditClientComponent } from './edit-client/edit-client.component';

@NgModule({
  declarations: [ClientsComponent, NewClientComponent, EditClientComponent],
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
