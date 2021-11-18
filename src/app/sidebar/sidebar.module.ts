import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [SidebarComponent],
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  exports: [SidebarComponent]
})
export class SidebarModule {}
