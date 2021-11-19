import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientsModule } from '../clients.module';
import { Client } from '../models/client';

@Injectable()
export class ClientsService {
  private readonly API = 'http://localhost:3000/clients';

  constructor(private readonly http: HttpClient) {}

  list(): Observable<Client[]> {
    return this.http.get<Client[]>(this.API);
  }
}
