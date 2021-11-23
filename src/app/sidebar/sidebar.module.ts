import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [SidebarComponent],
  imports: [CommonModule, RouterModule, FontAwesomeModule, NzIconModule],
  exports: [SidebarComponent]
})
export class SidebarModule {}
