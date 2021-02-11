import { Component, OnInit } from '@angular/core';
import {MatchPassword} from './../../../core/helper/match-password.validator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { JwtHandlerService } from 'src/app/core/services/jwt-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup ;
  submitted = false;
  
  constructor(private formBuilder: FormBuilder, private authService:AuthService, private jwtHandler: JwtHandlerService, private router :Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
  }, {
      validator: MatchPassword('password', 'confirmPassword')
  });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    // display form values on success
    this.authService.registerUser(this.registerForm.value)
    .subscribe(res=>{
      this.jwtHandler.saveToken(res.token);
      this.router.navigate(['/home'])
    },
    err=>console.log(err))
}

get f() { return this.registerForm.controls; }

onReset() {
  this.submitted = false;
  this.registerForm.reset();
}

}
