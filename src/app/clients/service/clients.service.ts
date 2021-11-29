import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseCrudService } from 'src/app/shared/services/base-crud.service';
import { environment } from 'src/environments/environment';

import { Client } from '../models/client';

@Injectable({ providedIn: 'root' })
export class ClientsService extends BaseCrudService<Client> {
  constructor(http: HttpClient) {
    super(http, `${environment.api.baseUrl}/clients`);
  }
}
