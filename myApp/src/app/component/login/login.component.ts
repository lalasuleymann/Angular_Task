import { Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import { CheckboxRequiredValidator, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { AppComponent } from "src/app/app.component";
import { AuthService } from "src/app/service/auth/auth.service";
import { NavbarComponent } from "../navbar/navbar.component";
@Component({
    templateUrl : './login.component.html',
    styleUrls : ['./login.component.css'],
})
export class LoginComponent implements OnInit{
    jwtHelperService: any;
    checked : boolean = false;
    currentUser: BehaviorSubject<any> = new BehaviorSubject(null);
    constructor(private router: Router, private loginAuth: AuthService){}
    ngOnInit(): void {
    }
    loginForm = new FormGroup({
        email : new FormControl("", [Validators.required, Validators.email]),
        password : new FormControl("",[
            Validators.required,
        ])
    });
    
    rememberMeChecked(){
        this.checked = !this.checked
    }
    
    loginSubmited(): void{
        this.loginAuth.loginUser(
            [this.loginForm.value.email, this.loginForm.value.password])
            .subscribe((res)=> {
                if(res == null){
                    this.loginAuth.logout(); //for guard
                }else{
                    this.loginAuth.login(); //for guard
                    this.router.navigate(["/employee"]);
                    if(this.checked){
                        this.loginAuth.setToken(res); //getting token
                    }
                }
            });
    }

    get Email(): FormControl{
        return this.loginForm.get('email') as FormControl;
    }
    get Password(): FormControl{
        return this.loginForm.get('password') as FormControl;
    } 
}
