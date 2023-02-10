import { Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http";
import { Observable } from "rxjs";
import { Employee } from "../../model/employee/employee";
import { AddEmployee } from "src/app/model/employee/addEmployee";
import { UpdateEmployee } from "src/app/model/employee/updateEmployee";
import { BaseService } from "../baseUrl.component";
import { EmpDep } from "src/app/model/employee/empDep";
import { addEmployeeDepartment } from "src/app/model/employee/addEmployeeDepartment";

@Injectable({
    providedIn : 'root'
})
export class EmployeeService{

    constructor(private base:BaseService,private http: HttpClient) {}

    baseApiUrlForEmployee = this.base.BaseApiUrl + 'employee/';
    baseApiUrlForEmployeeDepartment = this.base.BaseApiUrl + 'employeedepartment?id=';
    baseApiUrlForEmployeeDepartmentCreate = this.base.BaseApiUrl + '/employeedepartment?userId=';

    addEmployee(employee : AddEmployee) : Observable<addResponse>{
        return this.http.post<addResponse>(`${this.baseApiUrlForEmployee}`, employee)
    }

    getAllEmployees() : Observable<employeeResponses>{
        return this.http.get<employeeResponses>(`${this.baseApiUrlForEmployee}`);
    }

    getEmployeeDepartment(employeeId : number) : Observable<EmpDep[]>{
        return this.http.get<EmpDep[]>(`${this.baseApiUrlForEmployeeDepartment}${employeeId}`)
    }
    
    addEmployeeDepartment(employeeId : number, addEmployeeDepartment: addEmployeeDepartment) : Observable<employeeDepartmentResponse>{
        return this.http.get<employeeDepartmentResponse>(`${this.baseApiUrlForEmployeeDepartmentCreate}${employeeId}`)
    }

    updateEmployee(emp : number, employee: Employee) : Observable<Employee>{
        return this.http.put<Employee>(`${this.baseApiUrlForEmployee}${emp}`, employee);
    }
    
    deleteEmployee(emp: number) : Observable<AddEmployee>{
        return this.http.delete<AddEmployee>(`${this.baseApiUrlForEmployee}${emp}`);
    }
}
export class employeeResponses{
    employee : Employee[];
}
export class addResponse{
    employees : AddEmployee;
}
export class updateResponse{
    employees : UpdateEmployee;
}
export class employeeDepartmentResponse{
    employeeDepartments : addEmployeeDepartment;
}