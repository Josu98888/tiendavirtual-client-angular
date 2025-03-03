import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/userService';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService],
})
export class RegisterComponent implements OnInit {
  public user: any = 'user';
  public status: string | undefined;
  // declaro el form group
  public registerForm: FormGroup = new FormGroup({});

  constructor(private userService: UserService, private _router: Router) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }
  onSubmit() {
    this.user = new User(
      10,
      this.registerForm?.value.name,
      this.registerForm?.value.lastname,
      this.registerForm?.value.email,
      this.registerForm?.value.password,
      'ROLE_USER',
      ''
    );
    this.userService.register(this.user).subscribe(
      (response) => {
        if (response.status == 'success') {
          this.status = 'success';
          setTimeout(() => {
            this._router.navigate(['login']);
          }, 3000);
        } else {
          this.status = 'error';
        }
        console.log(response);
        this.registerForm.reset();
      },
      (error) => {
        this.status = 'error';
        if (error.error.errors?.email) {
          this.registerForm.get('email')?.setErrors({ emailTalken: true });
        }
        console.log(error);
      }
    );
    console.log(this.user);
  }
}
