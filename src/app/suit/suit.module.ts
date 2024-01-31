import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuitComponent } from './pages/suit/suit.component';
import { MaterialModule } from '../material/material.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SuitRoutingModule } from './suit-routing.module';
import { LaboratoryModule } from '../laboratory/laboratory.module';
import { PharmacyModule } from '../pharmacy/pharmacy.module';
import { RolesDirective } from '../directives/access-control.directive';



@NgModule({
  declarations: [
    SuitComponent,
    RolesDirective

  ],
  imports: [
    CommonModule,
    SuitRoutingModule,
    LaboratoryModule,
    PharmacyModule,
    MaterialModule,
    PrimeNgModule,
    ReactiveFormsModule
  ]
})
export class SuitModule { }
