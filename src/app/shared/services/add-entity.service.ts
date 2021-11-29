import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export abstract class AddEntityService<T> {
  abstract create(entity: T): Observable<Object>;
}
