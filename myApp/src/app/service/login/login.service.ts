import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn : 'root'
})
export class LoginService{

    baseApiUrl: string = 'https://localhost:44305/api/v1/';

    constructor(private http: HttpClient) {}

    loginUser(loginInfo: Array<any>)
    {
        return this.http.post(
            this.baseApiUrl + 'identity/login',
            {
                Email: loginInfo[0],
                Pwd: loginInfo[1]
            },
            {
                responseType: 'text'
            })
    };
}