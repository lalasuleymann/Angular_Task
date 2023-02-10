import { Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http";
import { Observable } from "rxjs";
import { Department } from "../../model/department/department";
import { AddDepartment } from "src/app/model/department/addDepartment";
import { BaseService } from "../baseUrl.component";

@Injectable({
    providedIn : 'root'
})
export class DepartmentService{
   
    constructor(private base: BaseService,private http: HttpClient) {}
    
    baseApiUrlForDepartment = this.base.BaseApiUrl + 'department/';
    
    addDepartment(department : AddDepartment) : Observable<departmentResponse>{
        return this.http.post<departmentResponse>(`${this.baseApiUrlForDepartment}`, department)
    }

    getAllDepartments() : Observable<departmentResponses>{
        return this.http.get<departmentResponses>(`${this.baseApiUrlForDepartment}`);
    }

    updateDepartment(dep: number, department: Department) : Observable<Department>{
        return this.http.put<Department>(`${this.baseApiUrlForDepartment}${dep}`, department);
    }

    deleteDepartment(dep: number) : Observable<Department>{
        return this.http.delete<Department>(`${this.baseApiUrlForDepartment}${dep}`);
    }
}

export class departmentResponses{
    departments : Department[];
}
export class departmentResponse{
    departments : AddDepartment;
}