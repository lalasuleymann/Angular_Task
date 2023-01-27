import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ConfigService } from './initializer/config.service';
import { AuthService } from './service/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  show = false;
  constructor(public authService: AuthService, private router: Router, private http: HttpClient){}
  ngOnInit() {
  }

  logOut(){
    this.authService.removeToken();
    this.router.navigateByUrl('/login');
    location.reload();
  }
}
