import { Component, OnInit } from '@angular/core';
import { Patient } from '../../interfaces/patient.interface';
import { CompletedrequestsService } from '../../services/completedrequests.service';
import { PrimeNGConfig } from 'primeng/api';
import { AuthService } from '../../../auth/services/auth.service';
@Component({
  selector: 'app-completelaboratories',
  templateUrl: './completelaboratories.component.html',
  styleUrls: ['./completelaboratories.component.scss']
})
export class CompletelaboratoriesComponent implements OnInit {
  //data variable
  display: boolean = false;
  patients: Patient[] = [];
  loading: boolean = true;

  constructor(private completedrequestsService: CompletedrequestsService, private authService: AuthService ) { }


  ngOnInit(): void {
    this.listData();
  }
  // metodo para mostrar la ventana de detalle
  showDialog() {
    this.display = true;
  }

  //metodo para listar los datos en la tabla
  listData() {
    const idUser = this.authService.user.id;
    console.log(idUser);
    this.completedrequestsService.getPatientsComplete(idUser)
    .subscribe(resp => {
      this.loading = false;
      this.patients = resp;
    },
    error => console.log(error.statusText));
  }

}
