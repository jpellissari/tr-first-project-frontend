import { Component, Input } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  @Input() withError: boolean = false;
  @Input() error$: Observable<boolean> = of(false);
  @Input() errorMessage: string = '';
}
