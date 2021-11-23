import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import {
  FaIconLibrary,
  FontAwesomeModule
} from '@fortawesome/angular-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

@NgModule({
  declarations: [ConfirmationDialogComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [ConfirmationDialogComponent]
})
export class SharedModule {
  constructor(private faLibary: FaIconLibrary) {
    this.faLibary.addIcons(faTrashAlt);
  }
}
