import { Component, OnInit, Output } from '@angular/core';
import { RequestpatientService } from '../../services/requestpatient.service';
import { Patient } from '../../interfaces/patient.interface';

import {DialogService} from 'primeng/dynamicdialog';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import { DetailPharmacyComponent } from '../../components/detail-pharmacy/detail-pharmacy.component';
@Component({
  selector: 'app-pharmacyrequests',
  templateUrl: './pharmacyrequests.component.html',
  styleUrls: [ './pharmacyrequests.component.scss'],
  providers: [DialogService, DynamicDialogRef]
})
export class PharmacyrequestsComponent implements OnInit {


  //data variable
  window: boolean = false;
  loading: boolean = true;
  patients:Patient[] =[];

  constructor(private requestpatientService: RequestpatientService, public dialogService: DialogService, public ref:DynamicDialogRef) { }


  ngOnInit(): void {
    this.listData();
  }

  // metodo para cargar la lista de pacientes en la tabla
  listData() {
    this.requestpatientService.getPatients()
    .subscribe(resp => {
      this.loading = false;
      this.patients = (resp.data);
      console.log(this.patients);
    },error => console.log(error.statusText));

  }
  //metodo para ver el detalle de la solicitud
  show(idpharmacy:any) {
    this.ref = this.dialogService.open(DetailPharmacyComponent, {
      header: '',
        width: '99%',
        contentStyle: {"max-height": "800px", "background-color":"#f5f5f5"},
        baseZIndex: 10000,
        transitionOptions: '300ms',
        data:idpharmacy
    });
  }

  //metodo para cerrar el dialogo
  ngOnDestroy() {
    if (this.ref) {
        this.ref.close();
    }
  }
}
