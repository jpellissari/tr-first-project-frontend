import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListLeavesComponent } from './components/list-leaves/list-leaves.component';

const routes: Routes = [
  {
    path: '',
    component: ListLeavesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeavesRoutingModule {}
