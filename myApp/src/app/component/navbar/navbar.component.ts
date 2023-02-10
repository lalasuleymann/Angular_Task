import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "src/app/model/user/user";
import { AuthService } from "src/app/service/auth/auth.service";
import { UserService } from "src/app/service/user/user.service";
import { LoginComponent } from "../login/login.component";
import { RegisterComponent } from "../register/register.component";
import jwt_decode from 'jwt-decode';
import { ConfigService } from "src/app/initializer/config.service";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { AppModule } from "src/app/app.module";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
  })
  export class NavbarComponent implements OnInit{

    user : any;
    asasas : any;
    constructor(public config: ConfigService,public authService: AuthService, private router: Router){
    }
    ngOnInit(): void {
      this.isUser();
    }
    logOut(){
      this.router.navigateByUrl('/login');
      this.authService.removeToken();
    }
    isUser(){
      this.user = this.config.settings.currentUser;
    }
  }