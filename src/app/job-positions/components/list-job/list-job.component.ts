import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable, Subject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { SideForm } from 'src/app/shared/models/side-form';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { JobPosition } from '../../models/job-position';
import { JobPositionsService } from '../../service/job-positions.service';

@Component({
  selector: 'app-list-job',
  templateUrl: './list-job.component.html',
  styleUrls: ['./list-job.component.scss']
})
export class ListJobComponent implements OnInit {
  sideForm!: SideForm;
  selectedJobPosition!: JobPosition;
  jobs$!: Observable<JobPosition[]>;
  error$ = new Subject<boolean>();

  constructor(
    private readonly jobsService: JobPositionsService,
    private readonly toastService: ToastService,
    private readonly loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.fetchJobPositions();
    this.initSideForm();
  }

  private fetchJobPositions() {
    this.loadingService.start();

    this.jobs$ = this.jobsService.list().pipe(
      tap(() => this.loadingService.stop()),
      catchError(() => {
        return this.handleError();
      })
    );
  }

  private initSideForm() {
    this.sideForm = {
      status: false,
      type: 'create'
    };
  }

  handleError() {
    this.loadingService.stop();
    this.error$.next(true);
    this.toastService.showErrorMessage(
      'Erro ao carregar lista de cargos. Tente mais tarde.'
    );
    return EMPTY;
  }

  openCreateForm(): void {
    this.sideForm = {
      status: true,
      type: 'create'
    };
  }

  openUpdateForm(job: JobPosition): void {
    this.selectedJobPosition = job;

    this.sideForm = {
      status: true,
      type: 'update'
    };
  }

  closeSideForm() {
    this.sideForm.status = false;
  }

  refresh() {
    this.fetchJobPositions();
  }
}
