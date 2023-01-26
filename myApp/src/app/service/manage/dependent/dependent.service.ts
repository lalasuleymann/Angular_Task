import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Employee } from "../../../model/employee/employee";
import { MyMainService } from "../../my-main.component";

@Injectable({
    providedIn : 'root'
})
export class DependentService{

    baseApiUrl: string = 'https://localhost:44305/api/v1/manageDependent?employeeId=';

    constructor(private main: MyMainService ,private http: HttpClient) {}

    getAllDependentEmployees(emp : number) : Observable<employeeResponses>{
        return this.http.get<employeeResponses>(`${this.baseApiUrl}${emp}`, {headers: new HttpHeaders(this.main.headerDict)});
    }
}
export class employeeResponses{
    employee : Employee[];
}