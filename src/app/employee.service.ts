import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  // private employees: Employee[] = [
  //   {
  //     employeeCode: 'EMP001',
  //     firstName: 'Om',
  //     lastName: 'Prakash',
  //     emailId: 'om@example.com',
  //     status: 'Active',
  //     skills: ['Angular, Java'],
  //     salary: 50000,
  //     job: '',
  //     country: ''
  //   },
    
  // ];

  // getEmployees(): Observable<Employee[]> {
  //   return of(this.employees);
  // }
  
  constructor() { }
}
