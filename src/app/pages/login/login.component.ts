import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/userService';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService],
})
export class LoginComponent implements OnInit {
  public user: any;
  public status: any;
  public loginForm: FormGroup = new FormGroup({})  ;

  constructor(
    private _userService: UserService,
    private _router: Router,
    @Inject(DOCUMENT) private document: Document
  ) { 
    
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
          email: new FormControl('', [Validators.required, Validators.email]),
          password: new FormControl('', Validators.required),
        });
  }

  someMethode() {
    this.document.location.reload();
  }

  onSubmit() {
    this.user = new User(
      10,
      '',
      '',
       this.loginForm?.value.email,
       this.loginForm?.value.password,
      'ROLE_USER',
      ''
    );

    this._userService.signup(this.user).subscribe(
      response => {
      if (!response.status || response.status != 'error') {
        this.status = 'success';
        const token = response;

        this._userService.signup(this.user, true).subscribe(
          response => {
            const identity = response;
            this._userService.saveSession(identity,token);
            setTimeout(() => {
              this._router.navigate(['']).then(() => {
                this.someMethode();
              });
            }, 3000);
          },
          error => {
            this.status = 'error';
            console.log(error);
          }
        );
      } else {
        this.status = 'error';
      }
    },
      error => {
        this.status = 'error';
        if (error.error.errors?.email) {
          this.loginForm.get('email')?.setErrors({ emailTaken: true });
        }
        if (error.status == 401) {
          this.loginForm.get('password')?.setErrors({ invalidPassword: true });
        }
        console.log(error);
      }
    );
  }

}
