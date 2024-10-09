import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.scss']
})
export class UpdatepopupComponent implements OnInit{
  rolesList:any;
  editdata:any;
  constructor(private builder:FormBuilder,private toaster:ToastrService,private service:AuthService, public dialogRef: MatDialogRef<UpdatepopupComponent>,@Inject(MAT_DIALOG_DATA) public data: any){}
  ngOnInit(): void {
    this.service.getAllRoles().subscribe({
      next:(result)=>{
         this.rolesList=result;
        

      },
      error:(error)=>{

      }
      
    });
    if(this.data.usercode != null && this.data.usercode != ''){
      this.service.getByCode(this.data.usercode).subscribe(result=>{
        this.editdata=result;
        console.log(result)
        this.updateform.setValue({
          id: this.editdata.id,
          name: this.editdata.name,
          email: this.editdata.email,
          password:this.editdata.password,
          gender:this.editdata.gender,
          role:this.editdata.role,
          isactive:this.editdata.isactive

        })
      })
    }
  }
  updateform=this.builder.group({
    id:this.builder.control(''),
    name:this.builder.control(''),
    password:this.builder.control(''),
    email:this.builder.control(''),
    gender:this.builder.control(''),
    role:this.builder.control('' ,Validators.required),
    isactive:this.builder.control(false)
  });
  updateUser() {
    console.log(this.updateform.value);
        if(this.updateform.valid){
          this.service.updateUser(this.updateform.value.id,this.updateform.value).subscribe({
            next:(result)=>{
              this.toaster.success("Update sucessfully");
              this.dialogRef.close();

            },
            error:(error)=>{

            }
          })

        }
  }
}
