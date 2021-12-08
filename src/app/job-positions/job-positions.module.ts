import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobPositionsRoutingModule } from './job-positions-routing.module';
import { ListJobComponent } from './components/list-job/list-job.component';
import { EditJobComponent } from './components/edit-job/edit-job.component';
import { AddJobComponent } from './components/add-job/add-job.component';
import { SharedModule } from '../shared/shared.module';
import { JobsComponent } from './components/jobs/jobs.component';

@NgModule({
  declarations: [ListJobComponent, EditJobComponent, AddJobComponent, JobsComponent],
  imports: [CommonModule, JobPositionsRoutingModule, SharedModule]
})
export class JobPositionsModule {}
