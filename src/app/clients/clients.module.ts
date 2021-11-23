import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './main-component/clients.component';
import { NewClientComponent } from './new-client/new-client.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientsService } from './service/clients.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { EditClientComponent } from './edit-client/edit-client.component';
import {
  FaIconLibrary,
  FontAwesomeModule
} from '@fortawesome/angular-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ClientsComponent, NewClientComponent, EditClientComponent],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    FontAwesomeModule,
    SharedModule
  ],
  providers: [ClientsService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ClientsModule {
  constructor(faLibrary: FaIconLibrary) {
    faLibrary.addIcons(faTrashAlt);
  }
}
