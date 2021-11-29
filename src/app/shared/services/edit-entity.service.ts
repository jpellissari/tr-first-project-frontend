import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export abstract class EditEntityService<T> {
  abstract update(entity: T): Observable<Object>;
}
