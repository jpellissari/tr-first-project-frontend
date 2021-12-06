import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AddEntityService } from 'src/app/shared/services/add-entity.service';
import { BaseCrudService } from 'src/app/shared/services/base-crud.service';
import { ListEntityService } from 'src/app/shared/services/list-entity.service';
import { environment } from 'src/environments/environment';
import { ApiLeave } from '../models/api-leave';
import { ApiSimplifiedLeave } from '../models/api-simplified-leave';

@Injectable({
  providedIn: 'root'
})
export class LeavesService
  implements ListEntityService<ApiSimplifiedLeave>, AddEntityService<ApiLeave>
{
  private readonly API_URL: string;

  constructor(private readonly http: HttpClient) {
    this.API_URL = `${environment.api.baseUrl}/leaves`;
  }

  create(entity: ApiLeave): Observable<Object> {
    return this.http.post(this.API_URL, entity).pipe(take(1));
  }

  list(): Observable<ApiSimplifiedLeave[]> {
    return this.http.get<ApiSimplifiedLeave[]>(this.API_URL);
  }
}
