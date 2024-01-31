import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PharmacyrequestsComponent } from './pages/pharmacyrequests/pharmacyrequests.component';
import { MaterialModule } from '../material/material.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PharmacyRoutingModule } from './pharmacy-routing.module';
import { DetailPharmacyComponent } from './components/detail-pharmacy/detail-pharmacy.component';



@NgModule({
  declarations: [
    PharmacyrequestsComponent,
    DetailPharmacyComponent
  ],
  imports: [
    CommonModule,
    PharmacyRoutingModule,
    MaterialModule,
    PrimeNgModule,
    ReactiveFormsModule
  ]
})
export class PharmacyModule { }
