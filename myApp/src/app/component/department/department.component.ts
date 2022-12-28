import { Component, OnInit } from "@angular/core"; 
import {FormGroup, FormBuilder, FormControl} from '@angular/forms'
import { Department } from "src/app/model/department/department";
import { DepartmentService } from "src/app/service/department/department.service";

@Component({ 
    templateUrl : './department.component.html',
    styleUrls: ['./department.component.css']
})

export class DepartmentComponent implements OnInit{

    depDetail !: FormGroup;
    depObj : Department = new Department();
    depList : Department[] = [];

    constructor(private formBuilder: FormBuilder, private depService: DepartmentService) { }

    ngOnInit(): void {
        
        this.getAllDepartment();

        this.depDetail = this.formBuilder.group({
            id: [''],
            name : [''],
        });
    }

    addDepartment() {
        console.log(this.depDetail);
        this.depObj.id = this.depDetail.value.id;
        this.depObj.name = this.depDetail.value.name;

        this.depService.addDepartment(this.depObj).subscribe(res=>{
            console.log(res);
            this.getAllDepartment();
        }, err=>{
            console.log(err);
        });
    }

    getAllDepartment() {
        this.depService.getAllDepartment().subscribe(res=>{
            this.depList = res;
        }, err =>{
            console.log("Error occured while fetching data!");
        });
    }

    editDepartment(dep : Department) {
        this.depDetail.controls['id'].setValue(dep.id);
        this.depDetail.controls['name'].setValue(dep.name);
    }

    updateDepartment() {
        this.depObj.id = this.depDetail.value.id;
        this.depObj.name = this.depDetail.value.name;

        this.depService.updateEmployee(this.depObj).subscribe(res=>{
            console.log(res);
            this.getAllDepartment();
        }, err=>{
            console.log(err);
        });
    }

    deleteEmployee(dep : Department) {
        this.depService.deleteDepartment(dep).subscribe(res=>{
            console.log(res)
            alert("Department Deleted Succesfully!");
            this.getAllDepartment();
        }, err=>{
            console.log(err);
        });
    }
}
