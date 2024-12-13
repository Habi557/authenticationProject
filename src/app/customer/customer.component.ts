import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {

  customerList?: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private service: AuthService) {
    this.loadCustomer();
  };
  displayedColumns: string[] = ['code', 'name', 'creditlimit', 'action'];
  loadCustomer() {
    this.service.getAllCustomers().subscribe({
      next: (result) => {
        this.customerList = result;
        this.dataSource = new MatTableDataSource(this.customerList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;


      },
      error: (e) => {
             console.log("error");      }
    })
  }
  updateCustomer(arg0: any) {
  }
  deleteCustomer(id: any) {

  }
  addCustomer(){

  }
}
