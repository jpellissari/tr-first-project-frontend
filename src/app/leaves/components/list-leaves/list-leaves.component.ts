import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SideForm } from 'src/app/shared/models/side-form';
import { ApiSimplifiedLeave } from '../../models/api-simplified-leave';
import { LeavesService } from '../../services/leaves.service';

@Component({
  selector: 'app-list-leaves',
  templateUrl: './list-leaves.component.html',
  styleUrls: ['./list-leaves.component.scss']
})
export class ListLeavesComponent implements OnInit {
  leaves$!: Observable<ApiSimplifiedLeave[]>;
  error$!: Subject<boolean>;
  sideForm!: SideForm;
  selectedLeave!: ApiSimplifiedLeave;

  constructor(private readonly leavesService: LeavesService) {}

  ngOnInit(): void {
    this.leaves$ = this.leavesService.list();
    this.sideForm = {
      type: 'create',
      status: false
    };
  }

  openCreateForm(): void {}
  openUpdateForm(leave: ApiSimplifiedLeave): void {}
  closeSideForm(): void {}
  refresh(): void {
    this.ngOnInit();
  }
}
