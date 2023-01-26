import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Permission } from "src/app/model/permission/permission";
import { UserPermission } from "src/app/model/userPermission/userpermission";
import { Employee } from "src/app/model/employee/employee";

@Injectable({
    providedIn : 'root'
})
export class PermissionService{

    baseApiUrl: string = 'https://localhost:44305/api/v1/permission';
    constructor(private http: HttpClient) {}

    getAllPermissions() : Observable<permissionResponses>{
        return this.http.get<permissionResponses>(`${this.baseApiUrl}`);
    }
    addPermission(permission : Permission) : Observable<permissionResponse>{
        return this.http.post<permissionResponse>(`${this.baseApiUrl}`, permission)
    }
    checkPermission(emp: UserPermission): Observable<boolean>{
        return this.http.post<boolean>(`https://localhost:44305/api/v1/check`, emp)
    }
    deletePermission(per: number) : Observable<Permission>{
        return this.http.delete<Permission>(`${this.baseApiUrl}${per}`);
    }
}

export class permissionResponses{
    permissions : Permission[];
}
export class permissionResponse{
    permissions : Permission;
}