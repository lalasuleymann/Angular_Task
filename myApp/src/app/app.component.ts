import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  results;
  constructor(public authService: AuthService, private router: Router, private http: HttpClient){
    const path = 'https://localhost:44305/api/v1/config';
    this.results = http.get(path);
  }
  ngOnInit() {
  }

  logOut(){
    this.authService.removeToken();
    this.router.navigateByUrl('/login');
    location.reload();
  }
}
