import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Permission } from "src/app/model/permission/permission";

@Injectable({
    providedIn : 'root'
})
export class AllPermissionsService{

    baseApiUrl: string = 'https://localhost:44305/api/v1/permission/';

    constructor(private http: HttpClient) {}

    getAllPermissions() : Observable<permissionResponse>{
        return this.http.get<permissionResponse>(`${this.baseApiUrl}`);
    }
}

export class permissionResponse{
    permissions : Permission[];
}