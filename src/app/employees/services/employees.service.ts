import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseCrudService } from 'src/app/shared/services/base-crud.service';
import { environment } from 'src/environments/environment';
import { ApiEmployee } from '../models/api-employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService extends BaseCrudService<ApiEmployee> {
  constructor(http: HttpClient) {
    super(http, `${environment.api.baseUrl}/employees`);
  }
}
