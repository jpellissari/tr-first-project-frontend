import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AddEntityService } from 'src/app/shared/services/interfaces/add-entity.service';
import { DeleteEntityService } from 'src/app/shared/services/interfaces/delete-entity.service';
import { EditEntityService } from 'src/app/shared/services/interfaces/edit-entity.service';
import { ListEntityService } from 'src/app/shared/services/interfaces/list-entity.service';
import { environment } from 'src/environments/environment';
import { ApiEmployee } from '../models/api-employee';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService
  implements
    ListEntityService<Employee>,
    AddEntityService<Employee>,
    EditEntityService<Employee>,
    DeleteEntityService
{
  private API_URL: string;

  constructor(private http: HttpClient) {
    this.API_URL = `${environment.api.baseUrl}/employees`;
  }

  delete(id: string): Observable<Object> {
    return this.http.delete(`${this.API_URL}/${id}`).pipe(take(1));
  }

  update(employee: Employee): Observable<Object> {
    const { id, ...data } = employee;
    return this.http.put(`${this.API_URL}/${id}`, data).pipe(take(1));
  }

  create(employee: Employee): Observable<Object> {
    return this.http.post(this.API_URL, employee).pipe(take(1));
  }

  list(client?: string): Observable<Employee[]> {
    let query = '';
    if (client) {
      query = `?client=${client}`;
    }
    return this.http
      .get<ApiEmployee[]>(`${this.API_URL}${query}`)
      .pipe(
        map((employees) =>
          employees.map((apiEmployee) => Employee.create(apiEmployee))
        )
      );
  }
}
