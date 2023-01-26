import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { filter } from "rxjs";
import { Department } from "src/app/model/department/department";
import { AddEmployee } from "src/app/model/employee/addEmployee";
import { Employee } from "src/app/model/employee/employee";
import { UpdateEmployee } from "src/app/model/employee/updateEmployee";
import { Permission } from "src/app/model/permission/permission";
import { Position } from "src/app/model/position/position";
import { User } from "src/app/model/user/user";
import { UserPermission } from "src/app/model/userPermission/userpermission";
import { AuthService } from "src/app/service/auth/auth.service";
import { DepartmentService } from "src/app/service/department/department.service";
import { EmployeeService } from "src/app/service/employee/employee.service";
import { DependentService } from "src/app/service/manage/dependent/dependent.service";
import { ManagerService } from "src/app/service/manage/manager/manager.service";
import { PermissionService } from "src/app/service/permission/permission.service";
import { PositionService } from "src/app/service/position/position.service";

@Component({
    selector: 'app-employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
    employee: Employee;
    currentEmployeeId: number;
    currenttEmployeeId: number;
    employeeForm: FormGroup;
    employees: Employee[] = [];
    updateEmployees: UpdateEmployee[] = [];

    dependentEmployee: Employee[] = [];
    positions: Position[] = [];
    user: User;
    userPermission: UserPermission
    managers: any;
    permission: Permission
    departments: Department[] = [];
    departmentForm: FormGroup;
    dropdownSettings;
    dropdownList;
    selectedDepartments;

    constructor(private toastr: ToastrService,
        private authService: AuthService, private permissionService: PermissionService,
        private router: Router, private managerService: ManagerService,
        private dependentService: DependentService, private formBuilder: FormBuilder,
        private positionService: PositionService, private departmentService: DepartmentService,
        private employeeService: EmployeeService, private http: HttpClient) {
        this.employee = {
            name: '',
            surname: '',
            birthDate: null,
            employeeParentId: 0,
            employeeParentName: '',
            positionId: 0,
            positionName: '',
            departmentId: 0,
            departmentName: '',
            createdDate: Date = null,
            modifiedDate: Date = null,
        };

        this.employeeForm = formBuilder.group({});
    }

    ngOnInit(): void {

        this.employeeForm = this.formBuilder.group({
            name: ['', Validators.required],
            surname: ['', Validators.required],
            birthDate: ['', Validators.required],
            employeeParentId: [''],
            positionId: [''],
            departmentId: [''],
        });

        this.departmentForm = this.formBuilder.group({
            departmentIds: [{ name: '' }, Validators.required]
        });
        this.dropdownSettings = {
            singleSelection: false,
            idField: 'id',
            textField: 'name',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All'
        };

        this.getAllEmployees();
        this.refreshed();
    }

    getAllEmployees() {
        this.employeeService.getAllEmployees().subscribe(res => {
            this.employees = res.employee;
        });
    }

    getAllDepartments() {
        this.departmentService.getAllDepartments().subscribe(res => {
            this.departments = res.departments;
            this.dropdownList = this.departments;
        });
    }

    getAllPositions() {
        this.positionService.getAllPositions().subscribe(res => {
            this.positions = res.positions;
        });
    }

    refreshed() {
        if (!localStorage.getItem("access_token")) {
            this.router.navigate(["/login"]);
        }
    }

    addEmployee() {
        let employee: AddEmployee = {
            name: this.Name.value,
            surname: this.Surname.value,
            birthDate: this.Birthdate.value,
            employeeParentId: this.EmployeeParentId.value,
            positionId : this.PositionId.value,
            departmentId : this.DepartmentId.value
        }
        this.employeeService.addEmployee(employee).subscribe((res) => {
            this.getAllEmployees();
        });
        this.employeeForm.reset();
    }

    getAllDependentEmployees(empId: number) {
        this.dependentService.getAllDependentEmployees(empId).subscribe(res => {
            this.dependentEmployee = res.employee;
        });
    }

    managerEmployees(empId: number) {
        this.managerService.getAllManagerEmployees(empId).subscribe(res => {
            if (empId !== res.id)
                this.managers = res;
        });
    }

    updateEmployee() {
        if (this.employeeForm.valid) {
            this.employeeService.updateEmployee(this.currentEmployeeId, this.employeeForm.value)
                .subscribe({
                    next: (res) => {
                        this.employeeForm.reset();
                        this.getAllEmployees();
                    }
                });
        }
        this.getAllEmployees();
    }

    editEmployee(empId: number) {
        this.currentEmployeeId = empId;
        let currentEmployee = this.updateEmployees.find((d) => { return d.id === empId });
        this.employeeForm.setValue({
            id: currentEmployee.id,
            name: currentEmployee.name,
            surname: currentEmployee.surname,
            birthDate: currentEmployee.birthDate,
            positionId: currentEmployee.positionId,
            departmetId: currentEmployee.departmentId,
            employeeParentId: currentEmployee.employeeParentId,
            modifiedDate: currentEmployee.modifiedDate.getDate
        })
    }

    public collection: any = [];
    deleteEmployee(emp: number) {
        alert('Sure to Delete?');
        this.collection.pop();
        this.employeeService.deleteEmployee(emp).subscribe((result) => {
            this.getAllEmployees();
        });
    }

    get Name(): FormControl {
        return this.employeeForm.get('name') as FormControl;
    }
    get Surname(): FormControl {
        return this.employeeForm.get('surname') as FormControl;
    }
    get Birthdate(): FormControl {
        return this.employeeForm.get('birthDate') as FormControl;
    }
    get PositionId(): FormControl {
        return this.employeeForm.get('positionId') as FormControl;
    }
    get DepartmentId(): FormControl {
        return this.employeeForm.get('departmentId') as FormControl;
    }
    get EmployeeParentId(): FormControl {
        return this.employeeForm.get('employeeParentId') as FormControl;
    }
}