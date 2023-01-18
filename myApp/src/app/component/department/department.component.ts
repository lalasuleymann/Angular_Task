import { Component, EventEmitter, OnInit } from "@angular/core"; 
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms'
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

    constructor(private formBuilder: FormBuilder, private departmentService: DepartmentService) {
        this.department ={
            name : ''
        }
        this.departmentForm = formBuilder.group({});
     }

    ngOnInit(): void {
        this.departmentForm = this.formBuilder.group({
            id: [''],
            name : ['', Validators.required],
        });
        this.getAllDepartments();
    }
    
    getAllDepartments(){
        this.departmentService.getAllDepartments().subscribe(res=>{
                this.departments =res.departments;
        });  
    }
    
    addDepartment() {
        let department : Department = {
            name : this.Name.value
        }

        this.departmentService.addDepartment(department).subscribe((res)=>{
            this.getAllDepartments();
        });
    }

    updateDepartment() {
        if(this.departmentForm.valid){
            this.departmentService.updateDepartment(this.currentDepartmentId, this.departmentForm.value)
            .subscribe({
                next:(res)=>{
                    this.departmentForm.reset();
                    this.getAllDepartments();
                }
            });
        }
        this.getAllDepartments();
    }

    editDepartment(depId: number) {
        this.currentDepartmentId = depId;
        let currentDepartment = this.departments.find((d)=>{return d.id === depId});
        this.departmentForm.setValue({
            id: currentDepartment.id,
            name: currentDepartment.name
        })
    }

    public collection : any = [];
    deleteDepartment(dep: number) {
        alert('Sure to Delete?');
        this.collection.pop();
        this.departmentService.deleteDepartment(dep).subscribe((result)=>{
            this.getAllDepartments();
        });
        this.getAllDepartments();
    }
    
    get Name(): FormControl{
        return this.departmentForm.get('name') as FormControl;
    }
}
