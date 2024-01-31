import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Patient } from '../interfaces/patient.interface';


@Injectable({
  providedIn: 'root'
})
export class CompletedrequestsService {
  // Variables
  private baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) { }


    //Metodo para el Servicio de obtener los pacientes con laboratorios completados
  getPatientsComplete(idUser:any): Observable<Patient[]> {
      const url = `${ this.baseUrl }/laboratorios/pacientes`;
      let params = new HttpParams();
      params = params.append( 'estado', 'Completado');
      params = params.append( 'id_wusuario', idUser);
      const headers = new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('access_token' || '')
      });
      return this.http.get<Patient[]>(url, {headers,params})

    }
}
