import { Component, OnInit } from "@angular/core"; 
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { LoginService } from "src/app/service/login/login.service";

@Component({ 
    templateUrl : './login.component.html',
    styleUrls : ['./login.component.css']
})
export class LoginComponent implements OnInit{

    constructor(private login: LoginService){}

    ngOnInit(): void {
    }

    loginForm = new FormGroup({
        email : new FormControl("", [Validators.required, Validators.email]),
        pwd : new FormControl("",[
           Validators.required,
           Validators.minLength(6)
        ]),
    });

    isUserValid: boolean = false;

    loginSubmited(){
        this.login.loginUser(
            [this.loginForm.value.email, this.loginForm.value.pwd])
            .subscribe(res=> {
                if(res == 'Failure'){
                    console.log(this.loginForm.valid);
                    this.isUserValid = false;   
                }else{
                    this.isUserValid = true;
                }
            });
        console.log(this.loginForm)
    }
    get Email(): FormControl{
        return this.loginForm.get('email') as FormControl;
    }
    get Pwd(): FormControl{
        return this.loginForm.get('pwd') as FormControl;
    }
}
