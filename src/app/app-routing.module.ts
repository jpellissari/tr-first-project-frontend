import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'clients' },
  {
    path: 'clients',
    loadChildren: () =>
      import('./clients/clients.module').then((module) => module.ClientsModule)
  },
  {
    path: 'jobs',
    loadChildren: () =>
      import('./job-positions/job-positions.module').then(
        (module) => module.JobPositionsModule
      )
  },
  {
    path: 'employees',
    loadChildren: () =>
      import('./employees/employees.module').then(
        (module) => module.EmployeesModule
      )
  },
  {
    path: 'leaves',
    loadChildren: () =>
      import('./leaves/leaves.module').then((module) => module.LeavesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
