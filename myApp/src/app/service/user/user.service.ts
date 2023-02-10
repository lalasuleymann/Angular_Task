import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AddUserPermissions } from "src/app/model/userPermission/addUserPermission";
import { User } from "src/app/model/user/user";
import { UsersPermisssionResponse } from "src/app/model/userPermission/usersPermissions";
import { BaseService } from "../baseUrl.component";

@Injectable({
    providedIn : 'root'
})
export class UserService{

    
    constructor(private base: BaseService,private http: HttpClient) {}
    
    baseApiUrlForAdmin = this.base.BaseApiUrl + 'identity';
    baseApiUrlForAdmin2 = this.base.BaseApiUrl + 'userpermission?id=';
    baseApiUrlForAdmin3 = this.base.BaseApiUrl + 'userpermission?userId=';
    
    getAllUsers() : Observable<signedUsers>{
        return this.http.get<signedUsers>(`${this.baseApiUrlForAdmin}`);
    }

    getAllUserPermissionsById(userId : number):Observable<UsersPermisssionResponse[]>{
        return this.http.get<UsersPermisssionResponse[]>(`${this.baseApiUrlForAdmin2}${userId}`)
    }

    addUserPermission(userId : number, addUserPermission : AddUserPermissions) : Observable<userPermissionResponse>{
        return this.http.post<userPermissionResponse>(`${this.baseApiUrlForAdmin3}${userId}`, addUserPermission)
    }

    deleteOldPermissions(userId: number): Observable<AddUserPermissions>{
    return this.http.delete<AddUserPermissions>(`${this.baseApiUrlForAdmin3}${userId}`)
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