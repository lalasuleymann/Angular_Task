import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
// import { Employee } from "../../model/employee/employee";

@Injectable({
    providedIn : 'root'
})
export class EmployeeService{

    baseApiUrl: string = 'https://localhost:44305/api/v1/employee/';

    constructor(private http: HttpClient) {}

    // getAllEmployees() : Observable<Employee[]>{
    //     return this.http.get<Employee[]>(this.baseApiUrl);
    // }
}