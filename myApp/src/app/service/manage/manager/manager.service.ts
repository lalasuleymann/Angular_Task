import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Employee } from "../../../model/employee/employee";
import { MyMainService } from "../../my-main.component";

@Injectable({
    providedIn : 'root'
})
export class ManagerService{

    baseApiUrl: string = 'https://localhost:44305/api/v1/manageManager?employeeId=';

    constructor(private main: MyMainService ,private http: HttpClient) {}

    getAllManagerEmployees(emp : number) : Observable<Employee>{
        return this.http.get<Employee>(`${this.baseApiUrl}${emp}`, {headers: new HttpHeaders()});
    }
}


export class managerResponses{
    employees : Employee;
}