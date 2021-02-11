import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { JwtHandlerService } from 'src/app/core/services/jwt-handler.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted=false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private jwtHandler: JwtHandlerService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit(){
    this.submitted =true;

    if(this.loginForm.invalid){
      return;
    }
    this.authService.loginUser(this.loginForm.value)
      .subscribe(
        res=>{
          this.jwtHandler.saveToken(res.token);
      this.router.navigate(['/home'])
        },
        err=>{
          err=>console.log(err);
        }
      );
  }
  

}
