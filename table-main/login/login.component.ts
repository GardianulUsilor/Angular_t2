import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/helpers/custom-validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  implements OnInit{
  loginForm!: FormGroup;
  ngOnInit():void
  {
    this.initializeForm();
  }
  submitForm(){
    console.log();
  }
  initializeForm():void{
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, CustomValidators.passwordValidator]),
      remember: new FormControl (null)
    });
    
  }
  get email():FormControl{
    return this.loginForm.get('email') as FormControl;
  }
  
  get password():FormControl{
    return this.loginForm.get('password') as FormControl;
  }
  get remember():FormControl{
    return this.loginForm.get('remember') as FormControl;
  }
}
