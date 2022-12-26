import { Routes, RouterModule } from "@angular/router";

import { EmployeeComponent } from "./component/employee/employee.component";
import { LoginComponent } from "./component/login/login.component";
import { DepartmentComponent } from "./component/department/department.component";
import { PositionComponent } from "./component/position/position.component";

const routes : Routes = [
    { path: '', component: EmployeeComponent },
    { path: 'login', component: LoginComponent},
    { path: 'department', component: DepartmentComponent},
    { path: 'position', component: PositionComponent},

    { path: '**', redirectTo: ''}
];

export const appRoutingModule = RouterModule.forRoot(routes);