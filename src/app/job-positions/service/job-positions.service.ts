import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AddEntityService } from 'src/app/shared/services/interfaces/add-entity.service';
import { DeleteEntityService } from 'src/app/shared/services/interfaces/delete-entity.service';
import { EditEntityService } from 'src/app/shared/services/interfaces/edit-entity.service';
import { ListEntityService } from 'src/app/shared/services/interfaces/list-entity.service';
import { environment } from 'src/environments/environment';
import { JobPosition } from '../models/job-position';
import { INewJobPosition } from '../models/new-job-position';

@Injectable({
  providedIn: 'root'
})
export class JobPositionsService
  implements
    ListEntityService<JobPosition>,
    AddEntityService<INewJobPosition>,
    EditEntityService<JobPosition>,
    DeleteEntityService
{
  private API_URL: string;

  constructor(private readonly http: HttpClient) {
    this.API_URL = `${environment.api.baseUrl}/jobs`;
  }

  list(): Observable<JobPosition[]> {
    return this.http.get<JobPosition[]>(this.API_URL);
  }

  create(data: INewJobPosition): Observable<Object> {
    return this.http.post(this.API_URL, data).pipe(take(1));
  }

  update(job: JobPosition): Observable<Object> {
    const { id, ...data } = job;
    return this.http.put(`${this.API_URL}/${id}`, data).pipe(take(1));
  }

  delete(id: string): Observable<Object> {
    return this.http.delete(`${this.API_URL}/${id}`).pipe(take(1));
  }
}
