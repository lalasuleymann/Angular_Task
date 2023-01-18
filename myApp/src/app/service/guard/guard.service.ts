import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { LoginComponent } from "src/app/component/login/login.component";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class GuardService implements CanActivate{

    constructor(private authService : AuthService, private router: Router){}

    canActivate() {
        if(!this.authService.isAuthenticated()){
            this.router.navigate(['/login']);
            return false;
        }else{
            return true;
        }
    }
}