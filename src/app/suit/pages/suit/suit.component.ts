import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs/operators';
import { AuthService } from '../../../auth/services/auth.service';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-suit',
  templateUrl: './suit.component.html',
  styleUrls: ['./suit.component.scss']
})
export class SuitComponent {
  //data variable
  items: MenuItem[]=[];
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(private router:Router, private authService:AuthService, private observer: BreakpointObserver) { }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
      this.profile();
  }
  //metodo para obtener los datos del usuario logueado
  get user() {
    return this.authService.user;
  }
  //metodo para cerrar sesion
  logout() {
    this.router.navigateByUrl('/auth');
    this.authService.logout();
  }
  profile() {
      this.items = [
        {label: this.user.nombre, icon: 'pi pi-fw pi-user'},
        {label: 'Cerrar Sesión', icon: 'pi pi-fw pi-sign-out', command: () => this.logout()}
    ];
  }


}
