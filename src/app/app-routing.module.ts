import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidateTokenGuard } from './guards/validate-token.guard';
import { SuitComponent } from './suit/pages/suit/suit.component';

const routes: Routes = [
  {
    path:'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)
  },
/*   {
    path:'laboratories',
    loadChildren: () => import('./laboratory/laboratory.module').then( m => m.LaboratoryModule),
    canActivate: [ValidateTokenGuard],
    canLoad: [ValidateTokenGuard]
  }, */
  {
    path:'suit',
    component: SuitComponent,
    loadChildren: () => import('./suit/suit.module').then( m => m.SuitModule)
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
