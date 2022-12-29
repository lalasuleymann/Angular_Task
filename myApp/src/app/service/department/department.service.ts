import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Department } from "../../model/department/department";

@Injectable({
    providedIn : 'root'
})
export class DepartmentService{

    addDepURL : string;
    getDepURL : string;
    updateDepURL : string;
    deleteDepURL : string;

    constructor(private http: HttpClient) { 
        this.addDepURL = 'http://localhost:9091/dep/addDepartment';
        this.getDepURL = 'http://localhost:9091/dep/getAll';
        this.updateDepURL = 'http://localhost:9091/dep/updateDepartment'; 
        this.deleteDepURL = 'http://localhost:9091/dep/deleteDepartmentById'; 
    }

    addDepartment(dep : Department) : Observable<Department>{
        return this.http.post<Department>(this.addDepURL, dep)
    }

    getAllDepartment() : Observable<Department[]>{
        return this.http.get<Department[]>(this.getDepURL);
    }

    updateDepartment(dep : Department) : Observable<Department>{
        return this.http.put<Department>(this.updateDepURL, dep);
    }

    deleteDepartment(dep: Department) : Observable<Department>{
        return this.http.delete<Department>(this.deleteDepURL + "/" + dep.id);
    }
}