import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { users } from '../Models/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  apiurl='http://localhost:8000/';
  getAll(){
    return this.http.get(this.apiurl+'users');
  }
  getByCode(code:users):Observable<any>{
    //return this.http.get(this.apiurl+'users/'+code) as Observable<users>;
    return this.http.post(this.apiurl+'olx/user/authenticate',code,{responseType: 'text',
      observe: 'response'

    },);
  }
  getAllRoles(){
    return this.http.get(this.apiurl+'roles');
  }
  proceedregister(inputdata:any){
    return this.http.post(this.apiurl+'users',inputdata);
  }
  updateUser(code:any,inputdata:any){
    return this.http.put(this.apiurl+'users/'+code,inputdata);
  }
  getAllCustomers(){
    return this.http.get(this.apiurl+'customer')
  }
  getAccessByRole(role:any,menu:any){
    return this.http.get(this.apiurl+'roleaccess?role='+role+'&menu='+menu)
  }
  isLoggedIn(){
    return sessionStorage.getItem('userName')!=null;
  }
  isValidUser(){
    return this.http.get(this.apiurl+'users/'+sessionStorage.getItem('userName')).pipe(catchError(error=> throwError(error)));
  }
  getUserRole(){
    return sessionStorage.getItem('userRole')!=null?sessionStorage.getItem('userRole')?.toString():'';
  }
}
