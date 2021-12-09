import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Subject, Observable, of, EMPTY } from 'rxjs';
import { takeUntil, tap, catchError, take } from 'rxjs/operators';
import { SideForm } from 'src/app/shared/models/side-form';
import { LoadingService } from 'src/app/shared/services/loading/loading.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { environment } from 'src/environments/environment';
import { ApiSimplifiedLeave } from '../../models/api-simplified-leave';
import { LeavesService } from '../../services/leaves.service';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html'
})
export class LeavesComponent implements OnInit, OnDestroy {
  title: string = 'Leaves';
  selectedLeave: ApiSimplifiedLeave = {} as ApiSimplifiedLeave;
  sideForm: SideForm = new SideForm(false, 'create');
  loadingErrorMessage: string = 'Error';

  error$: Subject<boolean> = new Subject<boolean>();
  leaves$: Observable<ApiSimplifiedLeave[]> = of();

  private subscriptionDestroyer: Subject<void> = new Subject();

  constructor(
    private readonly toastService: ToastService,
    private readonly loadingService: LoadingService,
    private readonly leaveService: LeavesService,
    private readonly translateService: TranslateService,
    private readonly titleService: Title
  ) {}

  ngOnInit(): void {
    this.setPageTitle();
    this.setLoadingErrorMessage();
    this.fetchLeaves();
  }

  ngOnDestroy(): void {
    this.subscriptionDestroyer.next();
    this.subscriptionDestroyer.complete();
  }

  openCreateForm(): void {
    this.sideForm.type = 'create';
    this.sideForm.open();
  }

  openUpdateForm(leave: ApiSimplifiedLeave): void {
    this.selectedLeave = leave;

    this.sideForm.type = 'update';
    this.sideForm.open();
  }

  handleLeaveCreated(): void {
    this.refresh();
    this.sideForm.close();
  }

  refresh(): void {
    this.fetchLeaves();
  }

  private setPageTitle(): void {
    this.translateService
      .get('leaves.title')
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

  private fetchLeaves(): void {
    this.loadingService.start();

    this.leaves$ = this.leaveService.list().pipe(
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
}
