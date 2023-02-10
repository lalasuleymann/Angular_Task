import { style } from "@angular/animations";
import { HttpStatusCode } from "@angular/common/http";
import { Component, OnInit } from "@angular/core"; 
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms'
import { NgConfirmService } from "ng-confirm-box";
import { ToastrService } from "ngx-toastr";
import { ConfigService } from "src/app/initializer/config.service";
import { AddDepartment } from "src/app/model/department/addDepartment";
import { Department } from "src/app/model/department/department";
import { DepartmentService } from "src/app/service/department/department.service";
@Component({ 
    selector : 'app-department',
    templateUrl : './department.component.html',
    styleUrls: ['./department.component.css']
})

export class DepartmentComponent implements OnInit{

    departmentForm : FormGroup;
    department : Department;
    departments : Department[] = [];
    currentDepartmentId: number;

    constructor(private confirmService: NgConfirmService,
        private config:ConfigService, private toastr: ToastrService, 
        private formBuilder: FormBuilder, private departmentService: DepartmentService) {
        this.department ={
            name : '',
            createdDate: Date=null,
            modifiedDate: Date =null
        }
        this.departmentForm = formBuilder.group({});
     }

    ngOnInit(): void {
        this.departmentForm = this.formBuilder.group({
            id: [''],
            name : ['', Validators.required],
            createdDate : [''],
            modifiedDate : ['']
        });
        this.getAllDepartments();
    }
    
    hasDepartmentCreatePermission(){
        this.config.settings?.permissions?.grantedPermissions.includes("Department.Create");
    }

    hasDepartmentUpdatePermission(){
        this.config.settings?.permissions?.grantedPermissions.includes("Department.Update");
    }
    
    hasDepartmentDeletePermission(){
        this.config.settings?.permissions?.grantedPermissions.includes("Department.Delete");
    }

    getAllDepartments(){
        this.departmentService.getAllDepartments().subscribe(res=>{
            this.departments =res.departments;
        }); 
    }
    addDepartment() {
        let department : AddDepartment = {
            name : this.Name.value,
        }
        
        this.departmentService.addDepartment(department).subscribe((res)=>{
            this.getAllDepartments();
            this.toastr.success("Department Added!");
        });
        this.departmentForm.reset();
    }

    updateDepartment() {
        if(this.departmentForm.valid){
            this.departmentService.updateDepartment(this.currentDepartmentId, this.departmentForm.value)
            .subscribe({
                next:(res)=>{
                    this.departmentForm.reset();
                    this.getAllDepartments();
                    this.toastr.success("Department Updated!");
                }
            });
        }
    }

    editDepartment(depId: number) {
        this.currentDepartmentId = depId;
        let currentDepartment = this.departments.find((d)=>{return d.id === depId});
        this.departmentForm.setValue({
            id: currentDepartment.id,
            name: currentDepartment.name,
            createdDate: currentDepartment.createdDate,
            modifiedDate: currentDepartment.modifiedDate
        })
    }

    public collection : any = [];
    deleteDepartment(dep: number) {
        this.confirmService.showConfirm("Sure to Delete?",
        ()=>{
            this.collection.pop();
            this.departmentService.deleteDepartment(dep).subscribe((result)=>{
                this.getAllDepartments();
                    this.toastr.success("Department Deleted!");
            });
        },
        ()=>[
            this.toastr.error("Department is not Deleted!")
        ]);
    }
    
    get Name(): FormControl{
        return this.departmentForm.get('name') as FormControl;
    }
    get CreatedDate(): FormControl{
        return this.departmentForm.get('createdDate') as FormControl;
    }
    get ModifiedDate(): FormControl{
        return this.departmentForm.get('modifiedDate') as FormControl;
    }
}
