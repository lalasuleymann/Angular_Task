import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { Department } from "src/app/model/department/department";
import { Employee } from "src/app/model/employee/employee";
import { Position } from "src/app/model/position/position";
import { DepartmentService } from "src/app/service/department/department.service";
import { EmployeeService } from "src/app/service/employee/employee.service";
import { PositionService } from "src/app/service/position/position.service";

@Component({
    selector: 'app-employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
    employee : Employee;
    currentEmployeeId: number;
    employeeForm : FormGroup;
    employees : Employee[] = [];
    positions: Position[] = [];

    departments: Department[] = [];
    departmentForm : FormGroup;
    dropdownSettings;
    dropdownList;
    selectedDepartments;

    constructor(private formBuilder: FormBuilder, private positionService: PositionService, private departmentService : DepartmentService, private employeeService: EmployeeService, private http: HttpClient) {
        this.employee ={
            name : '',
            surname : '',
            birthdate : null,
            positionId : [{id: 0, name: ''}],
            departmentIds : [{id: 0, name: ''}],
            createdDate : Date= null,
            modifiedDate : Date= null,
        };

        this.employeeForm = formBuilder.group({});
     }

     ngOnInit(): void {
        this.employeeForm = this.formBuilder.group({
             name: this.formBuilder.control(''),
             surname: this.formBuilder.control(''),
             birthdate: this.formBuilder.control(''),
             position: this.formBuilder.control(''),
             departmentIds: this.formBuilder.control(''),
             departmentDropdown: this.formBuilder.control('')
            });

            //dropdown
            this.departmentForm = this.formBuilder.group({
                departmentIds : [{name: ''}, Validators.required]
            });
            this.dropdownSettings={
                singleSelection: false,
                idField:'id',
                textField:'name',
                selectAllText:'Select All',
                unSelectAllText:'UnSelect All'
            };
            //dropdown
            this.getAllEmployees();
        }
        
    getAllEmployees(){
        this.employeeService.getAllEmployees().subscribe(res=>{
            this.employees = res.employee;
        });
    }
    getAllDepartments(){
        this.departmentService.getAllDepartments().subscribe(res => {
            this.departments = res.departments;
            this.dropdownList = this.departments;
        });
    }
    getAllPositions(){
        this.positionService.getAllPositions().subscribe(res=>{
            this.positions = res.positions;
        }); 
    }
    addEmployee() {
        let employee : Employee = {
            name: this.Name.value,
            surname: this.Surname.value,
            birthdate: this.Birthdate.value,
            positionId: this.Position.value,
            departmentIds: this.Department.value,
            createdDate : this.CreatedDate.value,
            modifiedDate : this.ModifiedDate.value
        }
        this.employeeService.addEmployee(employee).subscribe((res)=>{
            this.getAllPositions();
            this.getAllDepartments();
            this.employees.push(res.employees);
            this.getAllEmployees();
        });
    }

    updateEmployee() {  
        if(this.employeeForm.valid){
            this.employeeService.updateEmployee(this.currentEmployeeId, this.employeeForm.value)
            .subscribe({
                next:(res)=>{
                    this.employeeForm.reset();
                }
            });
        }
        this.getAllEmployees();
    }

    editEmployee(empId: number) {
        this.currentEmployeeId = empId;
        let currentEmployee = this.employees.find((d)=>{return d.id === empId});
        this.employeeForm.setValue({
            id: currentEmployee.id,
            name: currentEmployee.name,
            surname: currentEmployee.surname,
            birthdate: currentEmployee.birthdate,
            positionId: currentEmployee.positionId,
            departmetIds: currentEmployee.departmentIds
        })
    }

    public collection : any = [];
    deleteEmployee(emp: number) {
        alert('Sure to Delete?');
        this.collection.pop();
        this.employeeService.deleteEmployee(emp).subscribe((result)=>{
            console.log('Employee Deleted Succesfully!', result)
        });
        this.getAllEmployees();
    }
    
    get Name(): FormControl{
        return this.employeeForm.get('name') as FormControl;
    }
    get Surname(): FormControl{
        return this.employeeForm.get('surname') as FormControl;
    }
    get Birthdate(): FormControl{
        return this.employeeForm.get('birthdate') as FormControl;
    }
    get Position(): FormControl{
        return this.employeeForm.get('positionId') as FormControl;
    }
    get Department(): FormControl{
        return this.employeeForm.get('departmentIds') as FormControl;
    }
    get CreatedDate(): FormControl{
        return this.employeeForm.get('createdDate') as FormControl;
    }
    get ModifiedDate(): FormControl{
        return this.employeeForm.get('modifiedDate') as FormControl;
    }
}