import { Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { AppComponent } from "src/app/app.component";
import { AuthService } from "src/app/service/auth/auth.service";
@Component({
    templateUrl : './login.component.html',
    styleUrls : ['./login.component.css'],
})
export class LoginComponent implements OnInit{

    constructor(private router: Router, private loginAuth: AuthService){}
    ngOnInit(): void {
    }
    loginForm = new FormGroup({
        email : new FormControl("", [Validators.required, Validators.email]),
        password : new FormControl("",[
            Validators.required,
        ])
    });

    loginSubmited(): void{
        this.loginAuth.loginUser(
            [this.loginForm.value.email, this.loginForm.value.password])
            .subscribe((res)=> {
                if(res == null){
                    if(this.Email.value || this.Password.value){

                    }
                    this.loginAuth.logout(); //for guard
                }else{
                    this.loginAuth.login(); //for guard
                    this.router.navigateByUrl('employee');
                    this.loginAuth.setToken(res); //getting token
                }
            });
    }
    // setcookie(){
    //     var e = document.getElementById('email').value;
    //     var p = document.getElementById('password').value;

    //     document.cookie = "myemail" + e + ";path=http://localhost:4200/";
    //     document.cookie = "mypassword" + p + ";path=http://localhost:4200/";
    // }
    get Email(): FormControl{
        return this.loginForm.get('email') as FormControl;
    }
    get Password(): FormControl{
        return this.loginForm.get('password') as FormControl;
    } 
}
