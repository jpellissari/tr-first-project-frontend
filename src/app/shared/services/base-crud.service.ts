import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

export class BaseCrudService<T> {
  constructor(protected readonly http: HttpClient, private API_URL: string) {}

  list(): Observable<T[]> {
    return this.http.get<T[]>(this.API_URL);
  }

  loadByID(id: string) {
    return this.http.get<T>(`${this.API_URL}/${id}`).pipe(take(1));
  }

  private create(entity: Partial<T>) {
    return this.http.post(this.API_URL, entity).pipe(take(1));
  }

  private update(id: string, entity: Partial<T>) {
    return this.http.put(`${this.API_URL}/${id}`, entity).pipe(take(1));
  }

  save(entity: Partial<T>, id?: string) {
    if (id) {
      return this.update(id, entity);
    }
    return this.create(entity);
  }

  delete(id: string) {
    return this.http.delete(`${this.API_URL}/${id}`).pipe(take(1));
  }
}
