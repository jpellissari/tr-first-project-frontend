import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseCrudService } from 'src/app/shared/services/base-crud.service';
import { environment } from 'src/environments/environment';
import { JobPosition } from '../models/job-position';

@Injectable({
  providedIn: 'root'
})
export class JobPositionsService extends BaseCrudService<JobPosition> {
  constructor(protected http: HttpClient) {
    super(http, `${environment.api.baseUrl}/jobs`);
  }
}
