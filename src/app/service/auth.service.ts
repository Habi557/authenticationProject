import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
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
  getByCode(code:users) {

   // return this.http.get('http://localhost:3000/users'+code);
    return this.http.post(this.apiurl+'olx/user/authenticate',code, { observe: 'response' });
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
    return this.http.get('http://localhost:3000/'+'customer')
  }
  getAccessByRole(role:any,menu:any){
    return this.http.get(this.apiurl+'roleaccess?role='+role+'&menu='+menu)
  }
  isLoggedIn(){
    return sessionStorage.getItem('token')!=null;
  }
  isValidUser(){
    return this.http.get(this.apiurl+'users/'+sessionStorage.getItem('userName')).pipe(catchError(error=> throwError(error)));
  }
  getUserRole(){
    return sessionStorage.getItem('userRole')!=null?sessionStorage.getItem('userRole')?.toString():'';
  }
  /*Testing code */
  add(a:number,b:number){
    return a+b;
  }
  sub(a:number,b:number){
    return a-b;
  }
  getByName(code:string) {

    return this.http.get(`http://localhost:3000/users/${code}`);
  }
  getAllUsers(): Observable<any>{
    return this.http.get(`http://localhost:3000/users`);
  }
  updateUserTest(id:string,data:any){
    return this.http.put(`http://localhost:3000/users/${id}`,data);

  }
  saveUser(userData:users){
    return this.http.post(`http://localhost:3000/users`,userData);
  }
}
