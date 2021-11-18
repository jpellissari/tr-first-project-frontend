import { Component } from '@angular/core';
import {
  faBuilding,
  faHome,
  faPlaneDeparture,
  faSuitcase,
  faUsers
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  icons = {
    home: faHome,
    clients: faBuilding,
    jobPositions: faSuitcase,
    employees: faUsers,
    employeeLeaves: faPlaneDeparture
  };

  constructor() {}
}
