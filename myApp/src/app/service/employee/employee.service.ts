import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Employee } from "../../model/employee/employee";
import { MyMainService } from "../my-main.component";
import { AddEmployee } from "src/app/model/employee/addEmployee";
import { UpdateEmployee } from "src/app/model/employee/updateEmployee";

@Injectable({
    providedIn : 'root'
})
export class EmployeeService{

    baseApiUrl: string = 'https://localhost:44305/api/v1/employee/';

    constructor(private main: MyMainService ,private http: HttpClient) {}

    addEmployee(employee : AddEmployee) : Observable<employeeResponse>{
        return this.http.post<employeeResponse>(`${this.baseApiUrl}`, employee, {headers: new HttpHeaders(this.main.headerDict)})
    }

    getAllEmployees() : Observable<employeeResponses>{
        return this.http.get<employeeResponses>(`${this.baseApiUrl}`, {headers: new HttpHeaders(this.main.headerDict)});
    }

    getManager() : Observable<employeeResponses>{
        return this.http.get<employeeResponses>(`${this.baseApiUrl}`, {headers: new HttpHeaders(this.main.headerDict)});
    }

    updateEmployee(emp : number, employee: updateResponse) : Observable<updateResponse>{
        return this.http.put<updateResponse>(`${this.baseApiUrl}${emp}`, employee, {headers: new HttpHeaders(this.main.headerDict)});
    }
    
    deleteEmployee(emp: number) : Observable<Employee>{
        return this.http.delete<Employee>(`${this.baseApiUrl}${emp}`, {headers: new HttpHeaders(this.main.headerDict)});
    }
}
export class employeeResponses{
    employee : Employee[];
}
export class employeeResponse{
    employees : AddEmployee;
}
export class updateResponse{
    employees : UpdateEmployee;
}