import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListJobComponent } from './components/list-job/list-job.component';

const routes: Routes = [
  {
    path: '',
    component: ListJobComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobPositionsRoutingModule {}
