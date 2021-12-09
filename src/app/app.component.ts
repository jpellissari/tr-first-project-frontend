import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend-scss';

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('pt-br');
  }
}
