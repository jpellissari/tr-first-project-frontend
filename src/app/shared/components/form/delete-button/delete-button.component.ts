import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss']
})
export class DeleteButtonComponent {
  @Input() confirmationMessage: string = 'Tem certeza que deseja remover?';
  @Input() confirmationButtonText: string = 'Sim';
  @Input() cancellationButtonText: string = 'Não';
  @Output() deleteEntity: EventEmitter<void> = new EventEmitter();
}
