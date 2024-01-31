import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent {

  myLogin: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  constructor( private fb: FormBuilder, private router:Router, private authService:AuthService) { }

  login() {
    const {email, password} = this.myLogin.value;
    this.authService.login(email, password)
      .subscribe( resp => {
        var role = resp.user.rol;
        if ( resp.ok === true ) {
          if (role === 'laboratorio') {
            this.router.navigateByUrl('/suit/laboratory/patients');
          } else {
            if ( role === 'farmacia') {
              this.router.navigateByUrl('/suit/pharmacy/requests');
            } else {
              this.router.navigateByUrl('/suit/laboratory/patients');
            }
          }

        } else{
          Swal.fire('Error', 'Credenciales no válidas', 'error');
        }
      });
  }


}
