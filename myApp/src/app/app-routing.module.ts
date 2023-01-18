import { Routes, RouterModule } from "@angular/router";

import { EmployeeComponent } from "./component/employee/employee.component";
import { LoginComponent } from "./component/login/login.component";
import { DepartmentComponent } from "./component/department/department.component";
import { PositionComponent } from "./component/position/position.component";
import { RegisterComponent } from "./component/register/register.component";
import { AllPermissionsComponent } from "./component/permission/all/all-permissions.component";
import { GrantedPermissionsComponent } from "./component/permission/granted/granted-permissions.component";
import { GuardService } from "./service/guard/guard.service";
import { UserPermissionComponent } from "./component/permission/userPermission/user-permissions.component";
import { DependentComponent } from "./component/manage/dependent/depentend.component";
import { ManagerComponent } from "./component/manage/manager/manager.component";

const routes : Routes = [
    // , canActivate: [GuardService] 
    // {path: '/', component: AppComponent},
    { path: 'employee', component: EmployeeComponent},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'department', component: DepartmentComponent , canActivate: [GuardService]},
    { path: 'position', component: PositionComponent , canActivate: [GuardService]},
    {path: 'allPermissions', component: AllPermissionsComponent},
    {path: 'grantedPermissions', component: GrantedPermissionsComponent , canActivate: [GuardService]},
    {path: 'userPermission', component: UserPermissionComponent, canActivate: [GuardService] },
    {path: 'dependentEmployee', component: DependentComponent, canActivate: [GuardService] },
    {path: 'managerEmployee', component: ManagerComponent, canActivate: [GuardService] },
    {path: '**', redirectTo: 'login'}
];

export const appRoutingModule = RouterModule.forRoot(routes);