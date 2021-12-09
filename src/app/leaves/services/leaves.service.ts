import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map, take, tap } from 'rxjs/operators';
import { AddEntityService } from 'src/app/shared/services/interfaces/add-entity.service';
import { DeleteEntityService } from 'src/app/shared/services/interfaces/delete-entity.service';
import { EditEntityService } from 'src/app/shared/services/interfaces/edit-entity.service';
import { FindByIdEntityService } from 'src/app/shared/services/interfaces/find-by-id-entity.service';
import { ListEntityService } from 'src/app/shared/services/interfaces/list-entity.service';
import { environment } from 'src/environments/environment';
import { IApiLeave } from '../models/api-leave';
import { ApiSimplifiedLeave } from '../models/api-simplified-leave';
import { EditLeave } from '../models/edit-leave';
import { ILeave, Leave } from '../models/leave';
import { NewLeave } from '../models/new-leave';

@Injectable({
  providedIn: 'root'
})
export class LeavesService
  implements
    ListEntityService<ApiSimplifiedLeave>,
    FindByIdEntityService<ILeave>,
    AddEntityService<NewLeave>,
    EditEntityService<EditLeave>,
    DeleteEntityService
{
  private readonly API_URL: string;

  constructor(private readonly http: HttpClient) {
    this.API_URL = `${environment.api.baseUrl}/leaves`;
  }

  update(entity: EditLeave): Observable<Object> {
    return this.http
      .put(`${this.API_URL}/${entity.leaveId}`, entity)
      .pipe(take(1));
  }

  create(entity: NewLeave): Observable<Object> {
    return this.http.post(this.API_URL, entity).pipe(take(1));
  }

  list(): Observable<ApiSimplifiedLeave[]> {
    return this.http.get<ApiSimplifiedLeave[]>(this.API_URL);
  }

  findById(id: string): Observable<ILeave> {
    return this.http.get<IApiLeave>(`${this.API_URL}/${id}`).pipe(
      take(1),
      map((leave) => Leave.create(leave)),
      catchError((error) => {
        console.log(error);
        return EMPTY;
      })
    );
  }

  delete(id: string): Observable<Object> {
    return this.http.delete(`${this.API_URL}/${id}`).pipe(take(1));
  }
}
