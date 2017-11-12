import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SignupInfo } from '../../interfaces/signup-info';
import { LoginInfo } from '../../interfaces/login-info';
import { AuthApiService } from '../../services/auth-api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  newUser: SignupInfo = {
    signupFullName: '',
    signupUsername: '',
    signupPassword: ''
  }

  loginUser: LoginInfo = {
    loginUsername: '',
    loginPassword: ''
  }

  errorMessage: string;
  loginError: string;

  constructor(
    private authThang: AuthApiService,
    private routerThang: Router
  ) { }

  ngOnInit() {
  }

  signupSubmit() {
    this.authThang.postSignup(this.newUser)
      .subscribe(
        // if success, go to a different component
        (userInfo) => {
          this.routerThang.navigate(['']);
        },
        //if error display error
        (errInfo) => {
          console.log('Sign up error', errInfo);
          if (errInfo.status === 400) {
            this.errorMessage = 'Validation error';
          } else {
            this.errorMessage = "Something went wrong. Try again later"
          }
        }
      );
  }

  loginSubmit() {
    this.authThang.postLogin(this.loginUser)
      .subscribe(
        (userInfo) => {
          this.routerThang.navigate(['']);
        },
        (errInfo) => {
          console.log('Log in error', errInfo);
          if (errInfo.status === 401) {
            this.loginError = "Bad Credentials";
          } else {
            this.loginError = "Something went wrong, try again later"
          }
        }
      )
  }

}
