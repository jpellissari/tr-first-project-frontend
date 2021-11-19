import { Component } from '@angular/core';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent {
  public sideForm: boolean;

  constructor() {
    this.sideForm = false;
  }

  openForm(): void {
    this.sideForm = true;
  }

  closeForm(): void {
    this.sideForm = false;
  }
}
