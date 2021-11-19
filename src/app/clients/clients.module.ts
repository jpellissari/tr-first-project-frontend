import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './main-component/clients.component';
import { NewClientComponent } from './new-client/new-client.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ClientsComponent, NewClientComponent],
  imports: [CommonModule, ClientsRoutingModule, ReactiveFormsModule]
})
export class ClientsModule {}
