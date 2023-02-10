import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http'
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { appRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './component/employee/employee.component';
import { LoginComponent } from './component/login/login.component';
import { DepartmentComponent } from './component/department/department.component';
import { PositionComponent } from './component/position/position.component';
import { RegisterComponent } from './component/register/register.component';
import { GuardService } from './service/guard/guard.service';
import { NavbarComponent } from './component/navbar/navbar.component';
import { DependentComponent } from './component/manage/dependent/depentend.component';
import { UserComponent } from './component/user/user.component';
import { UserWPComponent } from './component/userWithoutPermission/user.wp.component';
import { ConfigService } from './initializer/config.service';
import { TokenInterceptor } from './service/token-interceptor';
import { CustomDatePipe } from './service/custom.datepipe';
import { NgConfirmModule } from 'ng-confirm-box';
import { LuxonModule } from 'luxon-angular';

const initializeConfig = (
  configService: ConfigService,
  http: HttpClient
) => {
  return () => {
    return new Promise((resolve) => {
      http.get<any>('https://localhost:44305/api/v1/config')
          .subscribe((result)=>{
          configService.init(result);
          return resolve('Success');
          })
        });
    }
  };
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EmployeeComponent,
    LoginComponent,
    DepartmentComponent,
    PositionComponent,
    RegisterComponent,
    DependentComponent,
    UserComponent,
    CustomDatePipe,
    UserWPComponent
  ],
  imports: [
    CommonModule,
    NgMultiSelectDropDownModule.forRoot(),
    ToastrModule.forRoot(),
    BrowserModule,
    appRoutingModule,
    HttpClientModule,
    LuxonModule,
    NgConfirmModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeConfig,
      deps: [ConfigService, HttpClient],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    GuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
