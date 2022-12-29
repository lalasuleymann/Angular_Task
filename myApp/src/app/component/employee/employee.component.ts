import { Component, OnInit } from "@angular/core";
import {FormGroup, FormBuilder, FormControl} from '@angular/forms';
import { Employee } from "src/app/model/employee/employee";
import { EmployeeService } from "src/app/service/employee/employee.service";

@Component({
    selector: 'app-employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit{

    empDetail !: FormGroup;
    empObj : Employee = new Employee();
    empList : Employee[] = [];

    constructor(private formBuilder: FormBuilder, private empService: EmployeeService) { }

    ngOnInit(): void {
        
        this.getAllEmployee();

        this.empDetail = this.formBuilder.group({
            id: [''],
            name : [''],
            surname : [''],
            birthdate : ['']
        });
    }

    addEmployee() {
        console.log(this.empDetail);
        this.empObj.id = this.empDetail.value.id;
        this.empObj.name = this.empDetail.value.name;
        this.empObj.surname = this.empDetail.value.surname;
        this.empObj.birthdate = this.empDetail.value.birthdate;

        this.empService.addEmployee(this.empObj).subscribe(res=>{
            console.log(res);
            this.getAllEmployee();
        }, err=>{
            console.log(err);
        });
    }

    getAllEmployee() {
        this.empService.getAllEmployee().subscribe(res=>{
            this.empList = res;
        }, err =>{
            console.log("Error occured while fetching data!");
        });
    }

    editEmployee(emp : Employee) {
        this.empDetail.controls['id'].setValue(emp.id);
        this.empDetail.controls['name'].setValue(emp.name);
        this.empDetail.controls['surname'].setValue(emp.surname);
        this.empDetail.controls['birthdate'].setValue(emp.birthdate);
    }

    updateEmployee() {
        this.empObj.id = this.empDetail.value.id;
        this.empObj.name = this.empDetail.value.name;
        this.empObj.surname = this.empDetail.value.surname;
        this.empObj.birthdate = this.empDetail.value.birthdate;

        this.empService.updateEmployee(this.empObj).subscribe(res=>{
            console.log(res);
            this.getAllEmployee();
        }, err=>{
            console.log(err);
        });
    }

    deleteEmployee(emp : Employee) {
        this.empService.deleteEmployee(emp).subscribe(res=>{
            console.log(res)        
            alert("Employee Deleted Succesfully!");
            this.getAllEmployee();
        }, err=>{
            console.log(err);
        });
    }
}