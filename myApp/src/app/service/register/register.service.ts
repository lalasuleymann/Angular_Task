import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn : 'root'
})
export class RegisterService{

    baseApiUrl: string = 'https://localhost:44305/api/v1/';

    constructor(private http: HttpClient) {}

    registerUser(registerInfo: Array<any>)
    {
        return this.http.post(
            this.baseApiUrl + 'identity/register',
            {
                Email: registerInfo[0],
                Pwd: registerInfo[1],
                RePwd: registerInfo[2]
            },
            {
                responseType: 'text'
            })
    };
}