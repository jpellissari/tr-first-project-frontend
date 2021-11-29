import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseCrudService } from 'src/app/shared/services/base-crud.service';
import { environment } from 'src/environments/environment';
import { ApiLeave } from '../models/api-leave';
import { ApiSimplifiedLeave } from '../models/api-simplified-leave';

@Injectable({
  providedIn: 'root'
})
export class LeavesService {
  private readonly API_URL: string;

  constructor(private readonly http: HttpClient) {
    this.API_URL = `${environment.api.baseUrl}/leaves`;
  }

  list(): Observable<ApiSimplifiedLeave[]> {
    return this.http.get<ApiSimplifiedLeave[]>(this.API_URL);
  }
}
