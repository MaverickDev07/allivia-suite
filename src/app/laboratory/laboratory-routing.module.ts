import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompletelaboratoriesComponent } from './pages/completelaboratories/completelaboratories.component';
import { PendinglaboratoriesComponent } from './pages/pendinglaboratories/pendinglaboratories.component';

const routes: Routes = [
  {
    path: '',
    //component: LaboratoryComponent,
    children: [
      {path: 'patients', component: PendinglaboratoriesComponent},
      {path: 'completedrequests', component: CompletelaboratoriesComponent},
      {path: '**', redirectTo: ''},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LaboratoryRoutingModule { }
