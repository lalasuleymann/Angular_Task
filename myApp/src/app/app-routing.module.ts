import { Routes, RouterModule } from "@angular/router";

import { EmployeeComponent } from "./component/employee/employee.component";
import { LoginComponent } from "./component/login/login.component";
import { DepartmentComponent } from "./component/department/department.component";
import { PositionComponent } from "./component/position/position.component";
import { RegisterComponent } from "./component/register/register.component";

const routes : Routes = [
    { path: 'employee', component: EmployeeComponent },
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'department', component: DepartmentComponent},
    { path: 'position', component: PositionComponent},

    { path: '**', redirectTo: ''}
];

export const appRoutingModule = RouterModule.forRoot(routes);