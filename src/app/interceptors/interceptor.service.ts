import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private router:Router, private authService: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //console.log('Pasando por el interceptor');
    return next.handle(req).pipe(
      catchError((err) => {
        console.log(err);
        if(
          [401, 403, 404].indexOf(err.status) !== -1
        ) {
          this.router.navigateByUrl('/auth');
          this.authService.logout();
        }
        return throwError(err);
      })
    );
  }
}
