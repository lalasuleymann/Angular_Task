import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { AddUserPermissions } from "src/app/model/userPermission/addUserPermission";
import { Permission } from "src/app/model/permission/permission";
import { User } from "src/app/model/user/user";
import { UserPermission } from "src/app/model/userPermission/userpermission";
import { PermissionService } from "src/app/service/permission/permission.service";
import { UserService } from "src/app/service/user/user.service";
import { Router } from "@angular/router";

@Component({
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    
    users: User[] = [];
    user: User;
    permissions: Permission[] = [];
    permission: Permission;
    permissionForm: FormGroup;
    dropdownSettings;
    dropdownList;
    selectedPermissions;

    currentUserPermissions: string[];
    permissionOptions = [];
    userHasPermissions: boolean = false;
    constructor(private userService : UserService,  private formBuilder: FormBuilder, private permissionService: PermissionService){
        this.permissionForm = formBuilder.group({});
    }
    
    ngOnInit(): void {
        this.permissionForm = this.formBuilder.group({
            permissionId : this.formBuilder.control('')
        });

        this.dropdownSettings={
            singleSelection: false,
            idField:'id',
            textField:'name',
            showSelectedItemsAtTop: true,
            selectAllText:'Select All',
            unSelectAllText:'UnSelect All'
        };
        this.getUsers();
    }
    getUsers(){
        this.userService.getAllUsers().subscribe(res=>{
            this.users = res.users;
        })
    }
    getAllPermissions(user: User) {
        this.user = user;
        this.permissionService.getAllPermissions().subscribe(res => {
            this.userService.getAllUserPermissionsById(user.id).subscribe(result => {
                this.selectedPermissions = result;
            });
            this.permissions = res.permissions;
            this.dropdownList = res.permissions;
        });
    }
    
    addPermission(userId:number){
        let addUserPermission : AddUserPermissions = {
            permissionIds: this.selectedPermissions.map(x=>x.id)
        }
        this.userService.deleteOldPermissions(userId).subscribe((result)=>{
            this.userService.addUserPermission(userId,addUserPermission).subscribe((res)=>{
                this.getUsers();
            });
        })
    }
}
   