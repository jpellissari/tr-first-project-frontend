import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export abstract class ListEntityService<T> {
  abstract list(): Observable<T[]>;
}
