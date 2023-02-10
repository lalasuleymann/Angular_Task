import { Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http";
import { Observable } from "rxjs";
import { Employee } from "../../../model/employee/employee";

@Injectable({
    providedIn : 'root'
})
export class DependentService{

    baseApiUrl: string = 'https://localhost:44305/api/v1/manageDependent?employeeId=';

    constructor(private http: HttpClient) {}

    getAllDependentEmployees(emp : number) : Observable<employeeResponses>{
        return this.http.get<employeeResponses>(`${this.baseApiUrl}${emp}`);
    }
}
export class employeeResponses{
    employee : Employee[];
}