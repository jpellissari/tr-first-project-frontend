import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from 'src/app/employees/models/employee';
import { ApiSimplifiedLeave } from '../../models/api-simplified-leave';

@Component({
  selector: 'app-list-leaves',
  templateUrl: './list-leaves.component.html'
})
export class ListLeavesComponent {
  @Input() leaves: ApiSimplifiedLeave[] = [];
  @Output() showLeave: EventEmitter<ApiSimplifiedLeave> =
    new EventEmitter<ApiSimplifiedLeave>();
}
