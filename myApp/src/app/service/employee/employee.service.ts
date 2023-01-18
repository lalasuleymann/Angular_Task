import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Employee } from "../../model/employee/employee";

@Injectable({
    providedIn : 'root'
})
export class EmployeeService{

    baseApiUrl: string = 'https://localhost:44305/api/v1/employee/';

    constructor(private http: HttpClient) {}

    addEmployee(employee : Employee) : Observable<employeeResponse>{
        return this.http.post<employeeResponse>(`${this.baseApiUrl}`, employee)
    }

    getAllEmployees() : Observable<employeeResponses>{
        return this.http.get<employeeResponses>(`${this.baseApiUrl}`);
    }

    updateEmployee(emp : number, employee: Employee) : Observable<Employee>{
        return this.http.put<Employee>(`${this.baseApiUrl}${emp}`, employee);
    }
    
    deleteEmployee(emp: number) : Observable<Employee>{
        return this.http.delete<Employee>(`${this.baseApiUrl}${emp}`);
    }
}

export class employeeResponses{
    employee : Employee[];
}
export class employeeResponse{
    employees : Employee;
}