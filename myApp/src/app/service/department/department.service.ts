import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Department } from "../../model/department/department";

@Injectable({
    providedIn : 'root'
})
export class DepartmentService{
   
    baseApiUrl: string = 'https://localhost:44305/api/v1/';

    constructor(private http: HttpClient) {}

    addDepartment(dep : Department) : Observable<Department>{
        return this.http.post<Department>(this.baseApiUrl + 'department', dep)
    }

    getAllDepartment() : Observable<Department[]>{
        return this.http.get<Department[]>(this.baseApiUrl + 'department');
    }

    updateDepartment(dep : Department) : Observable<Department>{
        return this.http.put<Department>(this.baseApiUrl + 'department/{departmentId}', dep);
    }

    deleteDepartment(dep: Department) : Observable<Department>{
        return this.http.delete<Department>(this.baseApiUrl + 'department/{departmentId}' + "/" + dep.id);
    }
}