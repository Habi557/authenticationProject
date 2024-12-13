import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerComponent } from './customer.component';
import { DebugElement } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { of } from 'rxjs';
import { MaterialModule } from 'src/material/material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

fdescribe('CustomerComponent', () => {
  let component: CustomerComponent;
  let fixture: ComponentFixture<CustomerComponent>;
  let el:DebugElement;
  let authservice:AuthService;
  const authServiceSpy =jasmine.createSpyObj('AuthService',['getAllCustomers'])

  beforeEach(async () => {
       authServiceSpy.getAllCustomers.and.returnValue(of([
        {
          "id": 1,
          "name": "Habibulla",
          "Creditlimit": 1000
        },
        {
          "id": 2,
          "name": "Abdulla",
          "Creditlimit": 1000
        },
        {
          "id": 3,
          "name": "Riyaz",
          "Creditlimit": 1000
        }
       ])) as any[];
    await TestBed.configureTestingModule({
      declarations: [ CustomerComponent ],
      imports:[MaterialModule,NoopAnimationsModule],
      providers:[
        {provide:AuthService, useValue:authServiceSpy}
      ]
    })
    .compileComponents();
    authservice = TestBed.inject(AuthService);


    fixture = TestBed.createComponent(CustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display data on the tabel', ()=>{
      //expect(data).toEqual(3);
     // expect(data[0].name).toEqual("Habibulla");
     const mockData = [
      { id: 1, name: 'Habibulla', creditlimit: 1000 },
      { id: 2, name: 'Abdulla', creditlimit: 1000 },
      { id: 3, name: 'Riyaz', creditlimit: 1000 },
    ];
    authServiceSpy.getAllCustomers.and.returnValue(of(mockData));
  
    component.loadCustomer();
  
    expect(component.customerList).toEqual(mockData);
    expect(component.dataSource.data).toEqual(mockData);
  });
});
