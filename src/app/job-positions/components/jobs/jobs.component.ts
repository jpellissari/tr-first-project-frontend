import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject, EMPTY, of } from 'rxjs';
import { tap, catchError, take, takeUntil } from 'rxjs/operators';
import { SideForm } from 'src/app/shared/models/side-form';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { environment } from 'src/environments/environment';
import { JobPosition } from '../../models/job-position';
import { JobPositionsService } from '../../service/job-positions.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnDestroy {
  title: string = '';
  selectedJob: JobPosition = {} as JobPosition;
  sideForm: SideForm = new SideForm(false, 'create');
  loadingErrorMessage: string = '';

  jobs$: Observable<JobPosition[]> = of();
  error$ = new Subject<boolean>();

  private subscriptionDestroyer: Subject<void> = new Subject();

  ngOnDestroy(): void {
    this.subscriptionDestroyer.next();
    this.subscriptionDestroyer.complete();
  }

  constructor(
    private readonly toastService: ToastService,
    private readonly loadingService: LoadingService,
    private readonly jobPositionsService: JobPositionsService,
    private readonly translateService: TranslateService,
    private readonly titleService: Title
  ) {
    this.fetchJobs();
    this.setPageTitle();
    this.setLoadingErrorMessage();
  }

  private setPageTitle(): void {
    this.translateService
      .get('jobs.title')
      .pipe(take(1))
      .subscribe((translation) => (this.title = translation));
    this.titleService.setTitle(`${environment.title} - ${this.title}`);
  }

  private setLoadingErrorMessage(): void {
    this.translateService
      .get('loading.errors.listLoading', {
        entity: this.title.toLowerCase()
      })
      .pipe(take(1))
      .subscribe((translation) => (this.loadingErrorMessage = translation));
  }

  private fetchJobs(): void {
    this.loadingService.start();
    this.jobs$ = this.jobPositionsService.list().pipe(
      takeUntil(this.subscriptionDestroyer),
      tap(() => this.loadingService.stop()),
      catchError(() => {
        return this.handleError(this.loadingErrorMessage);
      })
    );
  }

  private handleError(message: string) {
    this.loadingService.stop();
    this.error$.next(true);
    this.toastService.showErrorMessage(message);
    return EMPTY;
  }

  openCreateForm(): void {
    this.sideForm.type = 'create';
    this.sideForm.open();
  }

  openUpdateForm(job: JobPosition): void {
    this.selectedJob = job;

    this.sideForm.type = 'update';
    this.sideForm.open();
  }

  handleJobCreated(): void {
    this.refresh();
    this.sideForm.close();
  }

  refresh(): void {
    this.fetchJobs();
  }
}
