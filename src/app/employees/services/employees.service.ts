import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { parse } from 'date-fns';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AddEntityService } from 'src/app/shared/services/add-entity.service';
import { BaseCrudService } from 'src/app/shared/services/base-crud.service';
import { DeleteEntityService } from 'src/app/shared/services/delete-entity.service';
import { EditEntityService } from 'src/app/shared/services/edit-entity.service';
import { ListEntityService } from 'src/app/shared/services/list-entity.service';
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

  list(): Observable<Employee[]> {
    return this.http.get<ApiEmployee[]>(this.API_URL).pipe(
      map((employees) =>
        employees.map((apiEmployee) =>
          Object.assign({} as Employee, {
            ...apiEmployee,
            birthdate: parse(apiEmployee.birthdate, 'dd/MM/yyyy', new Date())
          })
        )
      )
    );
  }
}
