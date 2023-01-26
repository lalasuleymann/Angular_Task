import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Department } from "../../model/department/department";
import jwt_decode from 'jwt-decode';
import { MyMainService } from "../my-main.component";
import { AddDepartment } from "src/app/model/department/addDepartment";

@Injectable({
    providedIn : 'root'
})
export class DepartmentService{
   
    baseApiUrl: string = 'https://localhost:44305/api/v1/department/';
    constructor(private main: MyMainService ,private http: HttpClient) {}

    addDepartment(department : AddDepartment) : Observable<departmentResponse>{
        return this.http.post<departmentResponse>(`${this.baseApiUrl}`, department, {headers: new HttpHeaders(this.main.headerDict)})
    }

    getAllDepartments() : Observable<departmentResponses>{
        return this.http.get<departmentResponses>(`${this.baseApiUrl}`, {headers: new HttpHeaders(this.main.headerDict)});
    }

    updateDepartment(dep: number, department: Department) : Observable<Department>{
        return this.http.put<Department>(`${this.baseApiUrl}${dep}`, department, {headers: new HttpHeaders(this.main.headerDict)});
    }

    deleteDepartment(dep: number) : Observable<Department>{
        return this.http.delete<Department>(`${this.baseApiUrl}${dep}`, {headers: new HttpHeaders(this.main.headerDict)});
    }
}

export class departmentResponses{
    departments : Department[];
}
export class departmentResponse{
    departments : AddDepartment;
}