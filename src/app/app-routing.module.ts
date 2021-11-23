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
    path: 'job-positions',
    loadChildren: () =>
      import('./job-positions/job-positions.module').then(
        (module) => module.JobPositionsModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
