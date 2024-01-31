import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PharmacyrequestsComponent } from './pages/pharmacyrequests/pharmacyrequests.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'requests', component:PharmacyrequestsComponent},
      {path: '**', redirectTo: ''},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PharmacyRoutingModule { }
