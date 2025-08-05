// import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { EmployeeService } from '../employee.service';
// import { ReactiveFormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-employee-form',
//   imports: [ReactiveFormsModule],
//   templateUrl: './employee-form.component.html',
//   styleUrl: './employee-form.component.css'
// })
// export class EmployeeFormComponent implements OnInit{
//   employeeForm!: FormGroup;

//   constructor(
//     private fb: FormBuilder,
//     private employeeService: EmployeeService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.employeeForm = this.fb.group({
//       name: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       phone: [''],
//       department: [''],
//     });
//   }

//   saveEmployee() {
//     if (this.employeeForm.valid) {
//       this.employeeService.addEmployee(this.employeeForm.value).subscribe({
//         next: () => {
//           alert('Employee Saved!');
//           this.router.navigate(['/employee_table']);
//         },
//         error: (err) => {
//           console.error('Save failed', err);
//         }
//       });
//     }
//   }
// }
