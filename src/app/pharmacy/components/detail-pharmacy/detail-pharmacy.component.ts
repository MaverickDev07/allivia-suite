import { Component, Input, OnInit } from '@angular/core';
import { Patient, DataDetails, Doctor, Usuario, Fichamedica, Fichadiagnostico, Fichamedicamento, OrdenCompra, MedicamentoElement } from '../../interfaces/patient.interface';
import { RequestpatientService } from '../../services/requestpatient.service';
import { ChangeDetectorRef } from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
//import { PharmacyrequestsComponent} from '../../pages/pharmacyrequests/pharmacyrequests.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { from } from 'rxjs';

@Component({
  selector: 'app-detail-pharmacy',
  templateUrl: './detail-pharmacy.component.html',
  styleUrls: ['./detail-pharmacy.component.scss']
})
export class DetailPharmacyComponent implements OnInit {
  patients: Patient[] = [];
  purchase_order!: OrdenCompra;
  medicamentoElements: MedicamentoElement[]= [];
  details!: DataDetails;
  doctor!: Doctor;
  user!: Usuario;
  medical_record!: Fichamedica[];
  diagnostic_tab!: Fichadiagnostico[];
  medicines: Fichamedicamento[] =[];
  loading = true;
  list_id_add: string[] =[];
  list_id_lower?: string[] =[];
  ordenElements:any= [];
  //variables para el calculo
  auxototal= 0;
  total=0;
  datacalculate = 0;
  amount =0;
  discount= 0.04;
  price =0;
  id=0;
  percentage:any;
  expresion='';
  clicked = false;
  idclick = 0;


  constructor(private router:Router, private requestpatientService: RequestpatientService, private cdRef:ChangeDetectorRef,public config: DynamicDialogConfig, public ref:DynamicDialogRef ) {

  }

  ngOnInit(): void {
    this.listData();
  }



  // metodo para cargar la lista de medicamentos en la tabla
  listData() {
    this.requestpatientService.getPharmacyDetail(this.config.data)
    .subscribe(resp => {
      this.details = (resp.data);
      this.doctor = (resp.data.doctor);
      this.user = (resp.data.doctor.usuario);
      this.medical_record = (resp.data.fichamedica);
      this.diagnostic_tab = (resp.data.fichamedica[0].fichadiagnostico);
      this.medicines = (resp.data.fichamedica[0].fichamedicamentos);
      this.purchase_order = (resp.data.ordenCompra);
      this.medicamentoElements = (resp.data.ordenCompra.medicamentos);
    }, error => console.log(error.statusText));
  }

  //metodo para calcular el precio total
  total_calculation(idM:any,  group:any, medicine:any, dose:any,  amount:any, price:any,  expresion:any) {
    var value = price * amount;
    //console.log(price, amount);
    if ( expresion == 'add') {

      if (this.list_id_add?.includes(idM) == true ) {
        //console.log("el valor ya existe");
        //console.log(this.list_id_add + 'lista de add');
      } else {
      this.list_id_add?.push(idM);

      this.ordenElements.push(
        {
          "id":idM,
          "grupo": group,
          "medicamento": medicine,
          "dosis": dose,
          "cantidad":amount,
          "precio":price
        }
      )

      if (this.list_id_lower?.indexOf(idM) == -1) {

      } else {

        this.list_id_lower?.splice(this.list_id_lower?.indexOf(idM),1);
        //console.log(this.list_id_lower);
      }

      //console.log("el valor fue agregado");
      //console.log(this.list_id_add);
      this.auxototal +=value;
      console.log(this.auxototal);
      this.total += value;


      //console.log(this.total);
      this.percentage = Math.round(this.auxototal * this.discount).toFixed(2);
      this.total = this.auxototal - this.percentage;
      console.log('porcentage   ' + this.percentage);
      console.log('total ya con el descuento   ' + this.total);
      console.log('auxtotal   ' + this.auxototal);
      }

    } else {

      if (this.list_id_lower?.includes(idM) == true ) {
        console.log("el valor ya fue agregado en lower");
        console.log(this.list_id_lower);

      } else {
      this.list_id_lower?.push(idM);

      if (this.list_id_add?.indexOf(idM) == -1) {

      } else {

        this.list_id_add?.splice(this.list_id_add?.indexOf(idM),1);
        console.log(this.list_id_add);
        const resultado = this.ordenElements.findIndex( (element:any) => element.id === idM );
        if (resultado != -1) {
          this.ordenElements.splice(resultado,1);
        }
        console.log(resultado);
      }



      console.log("el valor fue agregado");
      console.log(this.list_id_lower);
      if ( this.total = 0 ) {
        this.total = 0;
        this.auxototal =0;
      } else {
        if ((this.total -= value) < 0 ) {
          this.total = 0;
          this.auxototal = 0;
        } else {
          this.auxototal -=value;
          this.total -= value;
          console.log(this.total);
          this.percentage = Math.round(this.total * this.discount).toFixed(2);
          this.total = this.total - this.percentage;
          console.log(this.percentage);
          console.log(this.total);
        }
      }

      }

    }

  }


  // metodo para enviar el orden de la recetea
  SendOrder() {
    //create the json
    var jsonSData:any = {
      "detalleenvioId": this.details.detalleenvio.id,
      "fichamedicaId": this.diagnostic_tab[0].fichamedicaId,
      "descuento": 4,
      "total": this.total,
      medicamentos: []
    };
    for (var i = 0; i < this.ordenElements.length; i++) {
      jsonSData.medicamentos.push({
        "id": this.ordenElements[i].id,
        "grupo": this.ordenElements[i].grupo,
        "medicamento": this.ordenElements[i].medicamento,
        "dosis": this.ordenElements[i].dosis,
        "cantidad": this.ordenElements[i].cantidad,
        "precio": this.ordenElements[i].precio,
      })
    }
    console.log(jsonSData);
    this.requestpatientService.sendOrder(jsonSData)
      .subscribe( resp => {
        if (resp.ok === true) {
          Swal.fire('Éxito', 'Orden de Farmacia Finalizada', 'success');
          this.ref.close();
         // this.parencomponent.listData();


        }
        else {
          Swal.fire('Error', 'error', 'error');
        }
      });
  }
  // metodo para abrir el mapa de ubicacion
  OpenMap(latitud:any, longitud:any) {
    const link = 'https://www.google.com/maps/search/?api=1&query='+latitud+','+longitud+'&zoom=20';
    return window.open(link, '_blank');
  }
}


