import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { FarResponse, AuthResponse } from '../interfaces/patient.interface';
@Injectable({
  providedIn: 'root'
})
export class RequestpatientService {
  private baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) { }

  //Metodo para el Servicio de obtener los pacientes con laboratorios pendientes
  getPatients(): Observable<FarResponse> {
    const url = `${ this.baseUrl }/farmacias/pacientes`;
    let params = new HttpParams();
    params = params.append( 'estado', '');
    params = params.append( 'estado', 'Pendiente');
    params = params.append( 'estado', 'Finalizado');
    params = params.append( 'estado', 'Cancelado');
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token' || '')
    });
    return this.http.get<FarResponse>(url, {headers,params})
  }

  //Metodo para obteber los datos de un detalle de receta
  getPharmacyDetail(id:string): Observable<AuthResponse> {
    return this.http.get<AuthResponse>( `http://104.154.164.119:3000/api/farmaciaRecetas/${id}`);
  }

  //Metodo para enviar el orden de receta
  sendOrder(formData:FormData) {
    const url = `http://104.154.164.119:3000/api/ordenCompraMedicamentos`;
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer '+ localStorage.getItem('access_token') || '');
    return this.http.post<FarResponse>(url, formData, {headers})
  }

}


