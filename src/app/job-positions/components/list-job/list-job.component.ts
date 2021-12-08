import { Component, EventEmitter, Input, Output } from '@angular/core';

import { JobPosition } from '../../models/job-position';
import { JobsComponent } from '../jobs/jobs.component';

@Component({
  selector: 'app-list-job',
  templateUrl: './list-job.component.html'
})
export class ListJobComponent {
  @Input() jobs: JobPosition[] = [];
  @Output() showJob: EventEmitter<JobPosition> =
    new EventEmitter<JobPosition>();
}
