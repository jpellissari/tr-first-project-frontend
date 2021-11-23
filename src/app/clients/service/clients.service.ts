import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError, delay, take } from 'rxjs/operators';

import { Client } from '../models/client';

@Injectable()
export class ClientsService {
  private readonly API = 'http://localhost:8080/clients';

  constructor(private readonly http: HttpClient) {}

  list(): Observable<Client[]> {
    return this.http.get<Client[]>(this.API);
  }

  create(name: string) {
    return this.http.post(this.API, { name }).pipe(take(1));
  }

  update(client: Client) {
    const { id, name } = client;
    return this.http.put(`${this.API}/${id}`, { name }).pipe(take(1));
  }

  delete(id: string) {
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }
}
