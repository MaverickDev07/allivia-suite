import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";
import { AuthService } from "../auth/services/auth.service";


@Directive({
  selector: '[roles]',
  inputs: ['roles']
})
export class RolesDirective {

  constructor(private _templateRef: TemplateRef<any>,
              private _viewContainer: ViewContainerRef,
              private userService: AuthService) {

  }

  @Input() set roles(allowedRoles: Array<string>) {
    let shouldShow: boolean = false;
    let userRoles:string = this.userService.user.rol!;
    console.log(userRoles);
    if(userRoles == "admin"){
      shouldShow = true;

    } else {
      for(let allowedRole of allowedRoles){
        if(allowedRole == userRoles){
          shouldShow = true;
          break;
        }
      }
    }
    if (shouldShow) {
      this._viewContainer.createEmbeddedView(this._templateRef);
    } else {
      this._viewContainer.clear();
    }

  }

}
