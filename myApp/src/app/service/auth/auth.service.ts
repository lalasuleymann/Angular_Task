import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject } from "rxjs";
import { ConfigService } from "src/app/initializer/config.service";
import { BaseService } from "../baseUrl.component";

@Injectable({
    providedIn : 'root'
})
export class AuthService{

    currentUser: BehaviorSubject<any> = new BehaviorSubject(null);
    
    constructor(private base: BaseService,private config: ConfigService,private http: HttpClient) {}
    
    jwtHelperService = new JwtHelperService();
    baseApiUrlForUser = this.base.BaseApiUrl + 'identity/';
    
    loginUser(loginInfo: Array<any>)
    {
        return this.http.post(
            this.baseApiUrlForUser + 'login',
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
            this.baseApiUrlForUser + 'register',
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

    hasEmployeePermission(){
        this.config.settings?.permissions?.grantedPermissions.includes("Employee");
    }
    hasDepartmentPermission(){
        this.config.settings?.permissions?.grantedPermissions.includes("Department");
    }
    hasPositionPermission(){
        this.config.settings?.permissions?.grantedPermissions.includes("Position");
    }
    hasAdminPermission(){
        this.config.settings?.permissions?.grantedPermissions.includes("Admin");
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