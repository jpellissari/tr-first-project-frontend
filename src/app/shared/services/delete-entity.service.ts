import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export abstract class DeleteEntityService {
  abstract delete(id: string): Observable<Object>;
}
