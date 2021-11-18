import { Component } from '@angular/core';
import {
  faBuilding,
  faHome,
  faPlaneDeparture,
  faSuitcase,
  faUsers
} from '@fortawesome/free-solid-svg-icons';
import { defaultIcons, IconsType } from '../shared/defaults/icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  public icons: IconsType;

  constructor() {
    this.icons = defaultIcons;
  }
}
