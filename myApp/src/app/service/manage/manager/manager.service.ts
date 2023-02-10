import { Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http";
import { Observable } from "rxjs";
import { Employee } from "../../../model/employee/employee";

@Injectable({
    providedIn : 'root'
})
export class ManagerService{

    baseApiUrl: string = 'https://localhost:44305/api/v1/manageManager?employeeId=';

    constructor(private http: HttpClient) {}

    getAllManagerEmployees(emp : number) : Observable<managerResponse>{
        return this.http.get<managerResponse>(`${this.baseApiUrl}${emp}`);
    }
}
export class managerResponse{
    employee : Employee[];
}