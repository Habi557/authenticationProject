import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private builder:FormBuilder,private toaster:ToastrService,private service:AuthService,private route: Router){}
  registerform=this.builder.group({
    id:this.builder.control('',Validators.compose([Validators.required,Validators.minLength(5)])),
    name:this.builder.control('',Validators.required),
    password:this.builder.control('',Validators.compose([Validators.required])),
    email:this.builder.control('',Validators.compose([Validators.required,Validators.email])),
    gender:this.builder.control('male'),
    role:this.builder.control(''),
    isactive:this.builder.control(false)
  });
  proceedregisteration(){
    if(this.registerform.valid){
      this.service.proceedregister(this.registerform.value).subscribe({
        next:(result)=>{
            this.toaster.success('please contact the admin for enable access','Registerd Successfully');
            this.route.navigate(['login']);
        },
        error:(err:any)=>{

        }
      }

      )
    }else{
      this.toaster.warning('Please Enter the valid data');
    }
  }

}
