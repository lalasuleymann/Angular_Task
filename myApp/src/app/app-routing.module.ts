import { Routes, RouterModule } from "@angular/router";

import { EmployeeComponent } from "./component/employee/employee.component";
import { LoginComponent } from "./component/login/login.component";
import { DepartmentComponent } from "./component/department/department.component";
import { PositionComponent } from "./component/position/position.component";
import { RegisterComponent } from "./component/register/register.component";
import { GuardService } from "./service/guard/guard.service";
import { DependentComponent } from "./component/manage/dependent/depentend.component";
import { UserComponent } from "./component/user/user.component";

const routes : Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    // {path: 'employee', component: EmployeeComponent, canActivate: [GuardService]},
    {path: 'employee', component: EmployeeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'department', component: DepartmentComponent},
    {path: 'position', component: PositionComponent},
    {path: 'user', component: UserComponent },
    {path: 'dependentEmployees', component: DependentComponent },
];

export const appRoutingModule = RouterModule.forRoot(routes);