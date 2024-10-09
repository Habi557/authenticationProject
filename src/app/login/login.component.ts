import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { users } from '../Models/users';
import { concatMap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  userData?: users
  constructor(private builder: FormBuilder, private toaster: ToastrService, private service: AuthService, private route: Router) {
    sessionStorage.clear();

  }
  loginForm = this.builder.group({
    userName: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.compose([Validators.required, Validators.maxLength(6)])),

    // name: this.builder.control(''),
    //   email: this.builder.control(''),
    //   gender: this.builder.control(''),
    //   role: this.builder.control(''),
    //   isactive: this.builder.control(false)
  })
  proceedLogin() {
    if (this.loginForm.valid) {

      const data: users = {
        id: this.loginForm.value.userName,
        password: this.loginForm.value.password,
        name: '',
        email: '',
        gender: '',
        role: '',
        isactive: false

      }

      this.service.getByCode(data)
        .subscribe(
          /* {next: (result) => {
            console.log(result)
            this.userData = result;
            debugger;
            if (this.loginForm.value.password === this.userData.password) {
              if (this.userData.isactive) {
                sessionStorage.setItem("userName", this.userData.id ||'{}');
                sessionStorage.setItem("userRole", this.userData.role || '{}');
                this.route.navigate([''])
              } else {
                this.toaster.warning('Please contact the admin', 'Inactive user')
              }
            } else {
              this.toaster.warning("Invalid credentials");
            }
          },
          error: () => {
            this.toaster.warning("Invalid details");
          }
        }*/
          {
            next: (result) => {
              console.log(result);
              sessionStorage.setItem("token", result.body);

              //  sessionStorage.setItem("userRole", this.userData.role || '{}');
              this.route.navigate([''])

            },
            error: (err) => {
              console.log("error");
              this.toaster.warning("Invalid details");

            }
          }
        )

    } else {
      this.toaster.warning("Enter the valid details");
    }
  }



}
