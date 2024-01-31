import { Component, OnInit } from '@angular/core';
import { PatientlistService } from '../../services/patientlist.service';
import { Patient } from '../../interfaces/patient.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ConfirmationService} from 'primeng/api';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-pendinglaboratories',
  templateUrl: './pendinglaboratories.component.html',
  styleUrls: ['./pendinglaboratories.component.scss'],
  providers: [ConfirmationService]
})
export class PendinglaboratoriesComponent implements OnInit{
  //data variable
  window: boolean = false;
  window_state: boolean = false;
  minimumDate: Date = new Date();
  patients: Patient[] = [];
  loading: boolean = true;
  id_laboratorio: any;
  formatDate: string = "YYYY-MM-DD HH:mm:ss";
  position: string = '';

  form_register: FormGroup = this.fb.group({
    fecha: ['', [Validators.required]],
    archivo: ['', [Validators.required]],
    id_laboratorios_paciente: [ '', [Validators.required]],
    fileSource: [ '', [Validators.required]],
  });

  constructor( private fb: FormBuilder, private patientlistService: PatientlistService, private authService: AuthService ) {}


  ngOnInit(): void {
    this.listData();
  }

  //metodo para registrar el laboratorio
  laboratorySave() {
    const dataLaboratory = new FormData();
    dataLaboratory.append('archivo', this.form_register.get('fileSource')?.value);
    dataLaboratory.append('estado', 'Completado');
    dataLaboratory.append('fecha', moment(this.form_register.value.fecha).format(this.formatDate));
    dataLaboratory.append('id_laboratorios_paciente', this.id_laboratorio);
    dataLaboratory.append('id_wusuario', this.authService.user.id);
    this.patientlistService.uploadLab(dataLaboratory)
     .subscribe( resp => {
       if (resp.ok === true ) {
         Swal.fire('Éxito', 'Laboratorio subido correctamente.', 'success');
         this.patients = [...this.patients];
         this.listData();
         this.window = false;
       } else {
          Swal.fire('Error', 'error', 'error');
       }
     });

  }

  //metodo para mostrar la ventana para registrar laboratirio
  showModalLaboratory(id_laboratorios_paciente:any) {
    this.id_laboratorio = id_laboratorios_paciente;
    this.window = true;
    console.log(this.id_laboratorio);
  }

  // metodo para obtener metadatos del archivo
  onBeforeSend(event:any) {
    const file = event.currentFiles[0]
    this.form_register.patchValue({ fileSource: file});
  }

  //metodo para mostrar la ventana para modificar el estado
  confirmEditState(id_laboratorios_paciente:any) {
    this.position = 'top-right';
    this.id_laboratorio = id_laboratorios_paciente;
    this.window_state = true;
  }

  //metodo para actualizar el estado del laboratorio
  laboratoryStateUpdate(){
    console.log(this.id_laboratorio);
    const estado =  'Procesando';
    this.patientlistService.editStateLaboratory(estado, this.id_laboratorio)
    .subscribe (resp => {
      if (resp.ok === true) {
        this.listData();
        this.window_state = false;
      } else {
        Swal.fire('Error', 'error', 'error');
     }
    });
  }

  // metodo para cargar la lista de pacientes en la tabla
  listData() {
    this.patientlistService.getPatients()
    .subscribe(resp => {
      this.loading = false;
      this.patients = resp;
    },error => console.log(error.statusText));

  }
}
