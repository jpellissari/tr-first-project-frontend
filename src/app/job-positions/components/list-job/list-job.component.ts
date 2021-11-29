import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { EMPTY, Observable, Subject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ListComponent } from 'src/app/shared/components/list-component';

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
export class ListJobComponent extends ListComponent<JobPosition> {
  constructor(
    toastService: ToastService,
    loadingService: LoadingService,
    jobPositionsService: JobPositionsService,
    translateService: TranslateService,
    titleService: Title
  ) {
    super(
      toastService,
      loadingService,
      jobPositionsService,
      translateService,
      titleService,
      'jobs'
    );
  }
}
