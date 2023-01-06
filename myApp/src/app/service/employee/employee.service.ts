import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Employee } from "../../model/employee/employee";

@Injectable({
    providedIn : 'root'
})
export class EmployeeService{

    baseApiUrl: string = 'https://localhost:44305';

    constructor(private http: HttpClient) {}

    addEmployee(emp : Employee) : Observable<Employee>{
        return this.http.post<Employee>(this.baseApiUrl + '/api/v1/employee', emp)
    }

    getAllEmployee() : Observable<Employee[]>{
        return this.http.get<Employee[]>(this.baseApiUrl + '/api/v1/employee');
    }

    updateEmployee(emp : Employee) : Observable<Employee>{
        return this.http.put<Employee>(this.baseApiUrl + '/api/v1/employee/{employeeId}', emp);
    }

    
    deleteEmployee(emp: Employee) : Observable<Employee>{
        return this.http.delete<Employee>(this.baseApiUrl + '/api/v1/employee/{employeeId}' + "/" + emp.id);
    }
}