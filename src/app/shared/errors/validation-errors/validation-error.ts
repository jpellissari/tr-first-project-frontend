import { Observable } from 'rxjs';

export interface ValidationError {
  buildMessage(): Observable<string>;
}
