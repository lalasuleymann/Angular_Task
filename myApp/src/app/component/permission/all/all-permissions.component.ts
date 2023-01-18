import { Component, OnInit } from "@angular/core";
import { Permission } from "src/app/model/permission/permission";
import { AllPermissionsService } from "src/app/service/permission/all/all-permissions.service";

@Component({
    templateUrl: './all-permissions.component.html',
    styleUrls: ['./all-permissions.component.css']
})
export class AllPermissionsComponent implements OnInit {
    
    permissions: Permission[] = [];
    private allService : AllPermissionsService
    constructor(){}
    
    ngOnInit(): void {

        this.allService.getAllPermissions().subscribe(res=>{
                this.permissions =res.permissions
        });
    }
}