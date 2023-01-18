import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ToastrModule } from 'ngx-toastr';
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { appRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './component/employee/employee.component';
import { LoginComponent } from './component/login/login.component';
import { DepartmentComponent } from './component/department/department.component';
import { PositionComponent } from './component/position/position.component';
import { RegisterComponent } from './component/register/register.component';
import { GuardService } from './service/guard/guard.service';
import { InitializerModule } from './initializer/initializer.module';
import { AllPermissionsComponent } from './component/permission/all/all-permissions.component';
import { GrantedPermissionsComponent } from './component/permission/granted/granted-permissions.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { UserPermissionComponent } from './component/permission/userPermission/user-permissions.component';
import { DependentComponent } from './component/manage/dependent/depentend.component';
import { ManagerComponent } from './component/manage/manager/manager.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EmployeeComponent,
    LoginComponent,
    DepartmentComponent,
    PositionComponent,
    RegisterComponent,
    AllPermissionsComponent,
    GrantedPermissionsComponent,
    UserPermissionComponent,
    DependentComponent,
    ManagerComponent
  ],
  imports: [
    NgMultiSelectDropDownModule.forRoot(),
    ToastrModule.forRoot(),
    BrowserModule,
    appRoutingModule,
    HttpClientModule,
    InitializerModule,
    FormsModule,
    ReactiveFormsModule,
    // BrowserAnimationsModule
  ],
  providers: [GuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
