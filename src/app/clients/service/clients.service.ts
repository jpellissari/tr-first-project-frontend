import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AddEntityService } from 'src/app/shared/services/interfaces/add-entity.service';
import { DeleteEntityService } from 'src/app/shared/services/interfaces/delete-entity.service';
import { EditEntityService } from 'src/app/shared/services/interfaces/edit-entity.service';
import { ListEntityService } from 'src/app/shared/services/interfaces/list-entity.service';
import { environment } from 'src/environments/environment';

import { Client } from '../models/client';
import { NewClient } from '../models/new-client';

@Injectable({ providedIn: 'root' })
export class ClientsService
  implements
    ListEntityService<Client>,
    AddEntityService<NewClient>,
    EditEntityService<Client>,
    DeleteEntityService
{
  private API_URL: string;

  constructor(private readonly http: HttpClient) {
    this.API_URL = `${environment.api.baseUrl}/clients`;
  }

  list(): Observable<Client[]> {
    return this.http.get<Client[]>(this.API_URL);
  }

  create(client: NewClient): Observable<Object> {
    return this.http.post(this.API_URL, client).pipe(take(1));
  }

  update(client: Client): Observable<Object> {
    const { id, ...data } = client;
    return this.http.put(`${this.API_URL}/${id}`, data).pipe(take(1));
  }

  delete(id: string): Observable<Object> {
    return this.http.delete(`${this.API_URL}/${id}`).pipe(take(1));
  }
}
