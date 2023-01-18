import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/service/auth/auth.service";
import { LoginComponent } from "../login/login.component";
import { RegisterComponent } from "../register/register.component";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
  })
  export class NavbarComponent implements OnInit{

    constructor(public authService: AuthService, private router: Router){}
    ngOnInit(): void {}

  logOut(){
    this.authService.removeToken();
    this.router.navigateByUrl('/login');
  }
}