import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AddUserPermissions } from "src/app/model/userPermission/addUserPermission";
import { User } from "src/app/model/user/user";
import { MyMainService } from "../my-main.component";
import { UsersPermisssionResponse } from "src/app/model/userPermission/usersPermissions";

@Injectable({
    providedIn : 'root'
})
export class UserService{

    baseApiUrl: string = 'https://localhost:44305/api/v1/identity';
    baseApiUrl2: string = 'https://localhost:44305/api/v1/userpermission?id=';
    baseApiUrl3: string = 'https://localhost:44305/api/v1/userpermission?userId=';
    constructor(private main: MyMainService ,private http: HttpClient) {}

    getAllUsers() : Observable<signedUsers>{
        return this.http.get<signedUsers>(`${this.baseApiUrl}`, {headers: new HttpHeaders(this.main.headerDict)});
    }

    getAllUserPermissionsById(userId : number):Observable<UsersPermisssionResponse[]>{
        return this.http.get<UsersPermisssionResponse[]>(`${this.baseApiUrl2}${userId}`)
    }

    addUserPermission(userId : number, addUserPermission : AddUserPermissions) : Observable<userPermissionResponse>{
        return this.http.post<userPermissionResponse>(`${this.baseApiUrl3}${userId}`, addUserPermission)
    }
}

export class user{
    user: User
}
export class signedUsers{
    users: User[]
}
export class userPermissionResponse{
    userPermissions : AddUserPermissions;
}