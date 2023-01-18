import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Department } from "../../model/department/department";

@Injectable({
    providedIn : 'root'
})
export class DepartmentService{
   
    baseApiUrl: string = 'https://localhost:44305/api/v1/department/';
    constructor(private http: HttpClient) {}

    addDepartment(department : Department) : Observable<departmentResponse>{
        return this.http.post<departmentResponse>(`${this.baseApiUrl}`, department)
    }

    getAllDepartments() : Observable<departmentResponses>{
        return this.http.get<departmentResponses>(`${this.baseApiUrl}`);
    }

    updateDepartment(dep: number, department: Department) : Observable<Department>{
        return this.http.put<Department>(`${this.baseApiUrl}${dep}`, department);
    }

    deleteDepartment(dep: number) : Observable<Department>{
        return this.http.delete<Department>(`${this.baseApiUrl}${dep}`);
    }
}
export class departmentResponses{
    departments : Department[];
}
export class departmentResponse{
    departments : Department;
}