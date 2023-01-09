import { NONE_TYPE } from "@angular/compiler";
import { Component, OnInit } from "@angular/core"; 
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { RegisterService } from "src/app/service/register/register.service";

@Component({ 
    templateUrl : './register.component.html',
    styleUrls : ['./register.component.css']
})
export class RegisterComponent implements OnInit{

    repeatPass: string = 'none';
    constructor(private register: RegisterService){}

    ngOnInit(): void {
    }

    registerForm = new FormGroup({
        email: new FormControl("", [Validators.required, Validators.email]),
        pwd: new FormControl("", [
            Validators.required,
            Validators.minLength(6)
         ]),
        repwd: new FormControl("")
    });

    registerSubmited(){
        this.register.registerUser(
            [this.registerForm.value.email, this.registerForm.value.pwd])
            .subscribe(res=>{
                if(this.Pwd.value == this.RePwd.value){
                   console.log(this.registerForm.valid);
                   this.repeatPass = 'none';
                }else{
                   this.repeatPass = 'inline';
                }
            });
        console.log(this.registerForm);
    }

    get Email(): FormControl{
        return this.registerForm.get('email') as FormControl;
    }
    get Pwd(): FormControl{
        return this.registerForm.get('pwd') as FormControl;
    }
    get RePwd(): FormControl{
        return this.registerForm.get('repwd') as FormControl;
    }
}