import { Component, OnInit } from "@angular/core"; 
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/service/auth/auth.service";
import { LoginComponent } from "../login/login.component";

@Component({ 
    templateUrl : './register.component.html',
    styleUrls : ['./register.component.css']
})
export class RegisterComponent implements OnInit{

    constructor(private router: Router, private register: AuthService){}

    ngOnInit(): void {
    }

    registerForm = new FormGroup({
        name: new FormControl("", [
           Validators.required
        ]),
        surname: new FormControl("", [
           Validators.required
        ]),
        email: new FormControl("", [Validators.required, Validators.email]),
        password: new FormControl("", [
            Validators.required,
            Validators.minLength(6)
         ]),
         rePassword: new FormControl("", [
            Validators.required,
            Validators.minLength(6)
         ])
    });

    registerSubmited(): void{
        this.register.registerUser(
            [this.registerForm.value.name,this.registerForm.value.surname,this.registerForm.value.email, this.registerForm.value.password, this.registerForm.value.rePassword])
            .subscribe(res=>{
                this.registerForm.reset();
                this.router.navigateByUrl('login');
            });
    }

    get Email(): FormControl{
        return this.registerForm.get('email') as FormControl;
    }
    get Password(): FormControl{
        return this.registerForm.get('password') as FormControl;
    }
    get RePassword(): FormControl{
        return this.registerForm.get('rePassword') as FormControl;
    }
    get Name(): FormControl{
        return this.registerForm.get('name') as FormControl;
    }
    get Surname(): FormControl{
        return this.registerForm.get('surname') as FormControl;
    }
}