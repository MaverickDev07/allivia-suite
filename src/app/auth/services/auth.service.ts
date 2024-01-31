import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthResponse, User } from '../interfaces/auth-interfaces';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //Variables
  private baseUrl: string = environment.baseUrl;
  private _user!: User;

  constructor( private http: HttpClient) { }

  //Metodo para obtener los datos del usuario
  get user()
  {
    return { ...this._user};
  }
  //Servicio para el Login
  login( email:string, password:string)
  {
    const url = `${ this.baseUrl }/auth/login`;
    const body = {email, password};
    return this.http.post<AuthResponse>(url,body)
      .pipe(
        tap(resp => {
          if( resp.ok ) {
            localStorage.setItem('access_token', resp.access_token!);
          }
        }),
        map( resp => resp),
        catchError( error => of(error.statusText) )
      )
  }
  //Servicio para verficar el token y permanecia de datos
  validateToken(): Observable<boolean>
  {
    const url = `${ this.baseUrl }/auth/token`;
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer '+ localStorage.getItem('access_token') || '');

    return this.http.get<AuthResponse>( url, { headers} )

      .pipe(
        map( resp => {
          localStorage.setItem('access_token', resp.access_token!);
          this._user = {
            id:resp.user.id,
            nombre:resp.user.nombre!,
            email:resp.user.email,
            rol:resp.user.rol!
          }
          return resp.ok;
        }),
        catchError( error => of(error.statusText))
      );
  }
  //Metodo para Salir
  logout() {
    localStorage.clear();
  }
}
