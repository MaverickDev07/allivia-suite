import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PendinglaboratoriesComponent } from './pages/pendinglaboratories/pendinglaboratories.component';
import { LaboratoryRoutingModule } from './laboratory-routing.module';
import { MaterialModule } from '../material/material.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CompletelaboratoriesComponent } from './pages/completelaboratories/completelaboratories.component';

@NgModule({
  declarations: [
    PendinglaboratoriesComponent,
    CompletelaboratoriesComponent
  ],
  imports: [
    CommonModule,
    LaboratoryRoutingModule,
    MaterialModule,
    PrimeNgModule,
    ReactiveFormsModule

  ]
})
export class LaboratoryModule { }
