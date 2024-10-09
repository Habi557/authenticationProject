import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isValidUser?: boolean;
  constructor(private service: AuthService, private toaster: ToastrService, private route: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      /*this.service.isValidUser().subscribe({
        next:(result)=>{
            this.isValidUser= (result !== null && typeof result === 'object')? true : false;

        },
        error:(err)=>{
             console.log("Error")
        }
        

        
      })*/
      if (this.service.isLoggedIn()) {
        if (route.url.length > 0) {
          let menu = route.url[0].path;
          if (menu == 'user') {
            if (this.service.getUserRole() == 'admin') {
              return true;
            } else {
              this.route.navigate(['']);
                this.toaster.warning('You dont have access.')
              return false;
            }
          }else{
            return true;
          }
        } else {
          return true;
        }
      }
      else {
        this.route.navigate(['login']);
        return false;
      }
  }

}
