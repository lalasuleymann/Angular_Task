import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn : 'root'
})
export class AuthService{

    currentUser: BehaviorSubject<any> = new BehaviorSubject(null);
    baseApiUrl: string = 'https://localhost:44305/api/v1/identity/';

    jwtHelperService = new JwtHelperService();
    constructor(private http: HttpClient) {}

    loginUser(loginInfo: Array<any>)
    {
        return this.http.post(
            this.baseApiUrl + 'login',
            {
                Email: loginInfo[0],
                Password: loginInfo[1],
                Name: loginInfo[2],
                Surname: loginInfo[3]
            },
            {
                responseType: 'text'
            })
    };
    registerUser(registerInfo: Array<any>)
    {
        return this.http.post(
            this.baseApiUrl + 'register',
            {
                Name: registerInfo[0],
                Surname: registerInfo[1],
                Email: registerInfo[2],
                Password: registerInfo[3],
                RePassword: registerInfo[4],
            },
            {
                responseType: 'text'
            })
    }

    setToken(token: string){
        localStorage.setItem("access_token", token);
        this.loadCurrentUser();
    }
    
    removeToken(){
        localStorage.removeItem("access_token");
    }

    loadCurrentUser(){
        const token = localStorage.getItem("access_token");
        const userInfo = token != null? this.jwtHelperService.decodeToken(token) : null;
        if(this.jwtHelperService.isTokenExpired(token)){
            this.removeToken();
        }
        const data = userInfo? {
            id : userInfo.id,
            email : userInfo.email,
            password : userInfo.password,
            token: userInfo.token
        } : null;
        this.currentUser.next(data);
    }
    
    isLoggedIn(){
        return localStorage.getItem('access_token');
    }
    isNotLoggedIn(){
        return localStorage.removeItem('access_token');
    }
    loggedIn: boolean = false;

    login(){
        this.loggedIn = true;
    }

    logout(){
        this.loggedIn = false;
    }

    isAuthenticated(){
        return this.loggedIn;
    }
}