import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { UpdatepopupComponent } from '../updatepopup/updatepopup.component';

@Component({
  selector: 'app-userlisting',
  templateUrl: './userlisting.component.html',
  styleUrls: ['./userlisting.component.scss']
})
export class UserlistingComponent {
  userList?: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private service: AuthService,private dialog:MatDialog) { 
    this.loadUser();
  };
  displayedColumns: string[] = ['username', 'name', 'email', 'role', 'status', 'action'];
  loadUser() {
    this.service.getAll().subscribe({
      next: (result) => {
        this.userList = result;
        this.dataSource = new MatTableDataSource(this.userList);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;


      },
      error: (e) => {

      }
    })
  }
  updateUser(userData:any) {
    const popup=this.dialog.open(UpdatepopupComponent,{
      enterAnimationDuration:'1000ms',
      exitAnimationDuration:'500ms',
      width:'50%',
      data:{
        usercode: userData
      }
    })
    popup.afterClosed().subscribe(result=>{
      this.loadUser();
    })
  }


}
