import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { TranslateService } from '@ngx-translate/core';

import { ToastService } from 'src/app/shared/services/toast.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { ListComponent } from 'src/app/shared/components/list-component';
import { Client } from '../../models/client';
import { ClientsService } from '../../service/clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent extends ListComponent<Client> {
  constructor(
    clientsService: ClientsService,
    toastService: ToastService,
    loadingService: LoadingService,
    translateService: TranslateService,
    titleService: Title
  ) {
    super(
      toastService,
      loadingService,
      clientsService,
      translateService,
      titleService,
      'clients'
    );
  }
}
