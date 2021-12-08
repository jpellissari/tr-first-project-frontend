import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export abstract class FindByIdEntityService<T> {
  abstract findById(id: string): Observable<T>;
}
