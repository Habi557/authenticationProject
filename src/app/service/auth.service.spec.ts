import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { users } from '../Models/users';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  const apiBaseUrl = 'http://localhost:3000/users'; // Shared API base URL

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController); // Ensure this line is present

  });
  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding HTTP requests
  });

  it('should add two numbers', () => {
    const result=service.add(2,2);
    expect(result).toBe(4);
  });
  it('should subtract two numbers',()=>{
    const subResult= service.sub(2,2);
    expect(subResult).toBe(0);
  })
  // Get All users
  it('should return all users',()=>{
    const mockData=[{
      "id": "Habibulla",
      "name": "shaik Habibulla",
      "password": "786786",
      "email": "habi79972@gmail.com",
      "gender": "male1",
      "role": "admin",
      "isactive": true
    }]
      service.getAllUsers().subscribe(allUsers=>{
       // expect(allUsers).toBeTruthy('No records found');
        expect(allUsers.length).toBe(1);
        const user=allUsers.find((user:users)=> user.id=="Habibulla");
        expect(user.password).toBe("786786");

      });

    const req = httpMock.expectOne(`${apiBaseUrl}`); // Check the request URL
    expect(req.request.method).toBe('GET'); // Check the request method
    req.flush(mockData); // Simulate a successful response
  })
  // Get By userName unitTest
  it('should return the user by name', ()=>{
    const mockData={
      "id": "Habibulla",
      "name": "shaik Habibulla",
      "password": "786786",
      "email": "habi79972@gmail.com",
      "gender": "male",
      "role": "admin",
      "isactive": true
    }
    service.getByName("Habibulla").subscribe((data)=>{
      expect(data).toEqual(mockData);
    });
    const req = httpMock.expectOne(`${apiBaseUrl}/Habibulla`); // Check the request URL
  expect(req.request.method).toBe('GET'); // Check the request method
  req.flush(mockData); // Simulate a successful response
  });

  // it will test the user update data
  it("should update the  user data",()=>{
    
    const mockData :users={
      "id": "Habibulla",
      "name": "shaik Habibulla",
      "password": "786786",
      "email": "habi79972@gmail.com",
      "gender": "male",
      "role": "admin",
      "isactive": true,
      token: ""
    }
    service.updateUserTest("Habibulla",mockData).subscribe((result:any)=>{
      console.log(result.id);
      expect(result).toEqual(mockData);
      expect(result.name).toEqual("shaik Habibulla");

    });
    const req=httpMock.expectOne(`${apiBaseUrl}/Habibulla`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockData);
  })

});
