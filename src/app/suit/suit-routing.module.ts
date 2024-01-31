import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidateTokenGuard } from '../guards/validate-token.guard';

const routes: Routes = [
  {
    path:'laboratory',
    loadChildren: () => import('../laboratory/laboratory.module').then( m => m.LaboratoryModule),
    canActivate: [ValidateTokenGuard],
    canLoad: [ValidateTokenGuard]
  },
  {
    path:'pharmacy',
    loadChildren: () => import('../pharmacy/pharmacy.module').then( m => m.PharmacyModule),
    canActivate: [ValidateTokenGuard],
    canLoad: [ValidateTokenGuard]
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuitRoutingModule { }
