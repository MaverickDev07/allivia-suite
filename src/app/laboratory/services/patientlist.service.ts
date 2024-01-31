import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Patient, LabResponse, AuthResponse } from '../interfaces/patient.interface';

@Injectable({
  providedIn: 'root'
})
export class PatientlistService {
  private baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) { }

  //Metodo para el Servicio de obtener los pacientes con laboratorios pendientes
  getPatients(): Observable<Patient[]> {
    const url = `${ this.baseUrl }/laboratorios/pacientes`;
    let params = new HttpParams();
    params = params.append( 'estado', 'Pendiente');
    params = params.append( 'estado', 'Procesando');
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token' || '')
    });
    return this.http.get<Patient[]>(url, {headers,params})
  }


  //Metodo para Actualizar el estado de un laboratorio
  editStateLaboratory(estado:string, id_laboratorios_paciente:number) {
    const body = {estado};
    const url = `${ this.baseUrl }/laboratorios/pacientes/${id_laboratorios_paciente}`;
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer '+ localStorage.getItem('access_token') || '');
    return this.http.put<AuthResponse>(url, body, {headers})
  }



  //Metodo para subir el examen realizado
  uploadLab(formData:FormData) {
    const url = `http://104.154.164.119:3000/api/archivolaboratorios`;
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer '+ localStorage.getItem('access_token') || '');
    return this.http.post<LabResponse>(url, formData, {headers})
  }
}
