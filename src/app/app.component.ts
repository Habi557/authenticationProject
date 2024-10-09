import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck{
  title = 'AuthenticationProject';
  isMenuRequied: boolean=false;
  isAdimUser=false;
  constructor(private route:Router,private service:AuthService){}
  ngDoCheck(): void {
    if(this.route.url=='/login' || this.route.url=='/register'){
      this.isMenuRequied=false;

    }else{
      this.isMenuRequied=true;
    }
    if(this.service.getUserRole()==='admin'){
      this.isAdimUser=true;
    }else{
      this.isAdimUser=false;
    }
  }

}
