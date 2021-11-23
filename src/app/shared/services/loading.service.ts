import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  constructor(private spinner: NgxSpinnerService) {}

  start() {
    this.spinner.show(undefined, {
      bdColor: 'rgba(0, 0, 0, 0.1)',
      size: 'medium',
      color: '#fff',
      type: 'pacman',
      fullScreen: false
    });
  }

  stop() {
    this.spinner.hide();
  }
}
