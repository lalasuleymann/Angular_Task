import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
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