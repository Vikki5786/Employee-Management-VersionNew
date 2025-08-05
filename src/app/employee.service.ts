import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee';

export interface Employee1 {
  employeeCode?: number; // same as 'id' from backend (if any)

  firstName: string;
  lastName: string;
  emailId: string;
  phoneNumber: string;
  gender: string;
  dateOfBirth: Date;
  maritalStatus: string;
  nationality: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  address: string;
  designation: string;
  job: string;
  dateOfJoining: Date;
  experience: number;
  salary: number; // or string, depending on how you're using BigDecimal
  reportingManager: string;
  status: string;
  skills: string;
  profileImage?: string; // file upload path or base64
  resume?: string; // file upload path or base64
}


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = 'http://localhost:8080/api/employees';

  private apiUrl = 'http://localhost:8080/api/employees';

  constructor(private http: HttpClient) { }

  addEmployee(formData: FormData): Observable<any> {
  return this.http.post(`${this.apiUrl}`, formData);
}


  // Create or Add new employee with file data
  saveEmployee(formData: FormData): Observable<Employee> {
    return this.http.post<Employee>(`${this.baseUrl}`, formData);
  }

  // Update employee using FormData
  updateEmployee(formData: FormData): Observable<Employee> {
    return this.http.put<Employee>(`${this.baseUrl}`, formData);
  }

  // Get all employees
  // getAllEmployees(): Observable<Employee[]> {
  //   return this.http.get<Employee[]>(`${this.baseUrl}`);
  // }

  getAllEmployees(): Observable<Employee1[]> {
    return this.http.get<Employee1[]>(this.apiUrl);
  }

  // Get employee by employeeCode
  getEmployeeById(employeeCode: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/${employeeCode}`);
  }

  // Delete employee by employeeCode
  deleteEmployee(employeeCode: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${employeeCode}`);
  }
}
