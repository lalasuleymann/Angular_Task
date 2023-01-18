import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-employee',
    templateUrl: './user-permissions.component.html',
    styleUrls: ['./user-permissions.component.css']
})
export class UserPermissionComponent implements OnInit {

    baseApiUrl: string = 'https://localhost:44305/api/v1/identity/';

    //constructor(private http: HttpClient, private loginComponent: LoginComponent){}
    
    ngOnInit(): void {

        // this.getAllSignedUsers().subscribe(res=>{
        //     for (const iterator of res.departments) {
        //         this.departments.push(iterator);
        //     }
        // });  
        
    }
    // getAllSignedUsers() : Observable<>{
    //     return this.http.get<>(`${this.baseApiUrl}`);
    // }
}