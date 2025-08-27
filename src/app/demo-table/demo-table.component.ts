import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { DropdownModule } from "primeng/dropdown";
import { SelectModule } from "primeng/select";
import { Table, TableModule } from 'primeng/table';
import { Employee1, EmployeeService } from '../employee.service';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { CommonModule } from '@angular/common';
import { Ripple } from 'primeng/ripple';
import { MenubarModule, Menubar, } from 'primeng/menubar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { Menu } from 'primeng/menu';
import { HttpClient } from '@angular/common/http';

interface Country {
  name: string;
  code: string;
  states: {
    name: string;
    cities: string[];
  }[];
}

@Component({
  selector: 'app-demo-table',
  standalone: true,
  imports: [
    CommonModule, BadgeModule, AvatarModule, InputTextModule, Ripple,
    SelectModule, FormsModule, TableModule, RouterModule, CalendarModule,
    Menubar, MenubarModule, OverlayPanelModule, ButtonModule,
    Menu, DialogModule, ReactiveFormsModule, DropdownModule
  ],
  templateUrl: './demo-table.component.html',
  styleUrls: ['./demo-table.component.css'],
  providers: [MessageService],
  styles: [
    `:host ::ng-deep  .p-frozen-column {
            font-weight: bold;
        }
        :host ::ng-deep .p-datatable-frozen-tbody {
            font-weight: bold;
        }`
  ],

})

export class DemoTableComponent implements OnInit {

  @ViewChild('menu') menu!: any;
  displayDialog = false;
  employeeForm!: FormGroup;
  employees: Employee1[] = [];
  items: MenuItem[] = [];
selectedProfileImage!: File;
selectedResume!: File;

  onSettings() {
    console.log('Settings clicked');
    // Navigate to settings page
  }

  genders = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' }
  ];

  profileItems: MenuItem[] = [
    {
      label: 'Settings',
      icon: 'pi pi-cog',
      routerLink: '/settings'
    },
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => this.logout()
    }
  ];

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router, public httpClient: HttpClient,
  ) {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
      gender: [''],
      dateOfBirth: [null],
      maritalStatus: [''],
      nationality: [''],
      country: [null],
      state: [null],
      city: [null],
      zipCode: [''],
      address: [''],
      designation: [''],
      department: [null],
      job: [''],
      dateOfJoining: [null],
      experience: [''],
      salary: [0],
      reportingManager: [''],
      status: [''],
      skills: [''],
      profileImage: [''],
      resume: ['']
    });
  }

countries: Country[] = [
    {
      name: 'India',
      code: 'IN',
      states: [
        { name: 'Karnataka', cities: ['Bengaluru', 'Mysuru'] },
        { name: 'Maharashtra', cities: ['Mumbai', 'Pune'] }
      ]
    },
    {
      name: 'USA',
      code: 'US',
      states: [
        { name: 'California', cities: ['Los Angeles', 'San Francisco'] },
        { name: 'Texas', cities: ['Houston', 'Dallas'] }
      ]
    }
  ];

  departments = [
    { name: 'Engineering' },
    { name: 'HR' },
    { name: 'Finance' },
    { name: 'Marketing' }
  ];

states: any[] = [];
  cities: any[] = [];

  onCountryChange(selectedCountry: Country) {
    const found = this.countries.find(c => c.name === selectedCountry.name);
    this.states = found?.states || [];
    this.cities = []; // reset cities
    this.employeeForm.patchValue({ state: null, city: null });
  }

 onStateChange(selectedState: any) {
    const foundState = this.states.find(s => s.name === selectedState.name);
    this.cities = foundState?.cities || [];
    this.employeeForm.patchValue({ city: null });
  }

  ngOnInit(): void {

    this.employeeService.getAllEmployees().subscribe({
    next: (data) => {
      this.employees = data;
    },
    error: (err) => {
      console.error('Failed to fetch employees', err);
    }
  });


    this.items = [
      { label: 'Home', icon: 'pi pi-home', routerLink: '/dashboard' },
      { label: 'Profile', icon: 'pi pi-user', routerLink: '/profile' },
      { label: 'New Employee', icon: 'pi pi-user-plus', command: () => this.openDialog() }
    ];
  }

  openDialog() {
    this.employeeForm.reset();
    this.displayDialog = true;
  }

  onCancel() {
    this.displayDialog = false;
    this.employeeForm.reset();
  }

  onFileChange(event: any, type: string) {
    const file = event.target.files[0];
    if (type === 'profileImage') {
      this.selectedProfileImage = file;
    } else if (type === 'resume') {
      this.selectedResume = file;
    }
  }

onSubmit() {
  const rawData = { ...this.employeeForm.value };

  // Convert nested country/state/city objects to string names
  rawData.country = rawData.country?.name || '';
  rawData.state = rawData.state?.name || '';
  rawData.city = typeof rawData.city === 'string' ? rawData.city : (rawData.city?.name || '');

  // Format dates to 'yyyy-MM-dd'
  if (rawData.dateOfBirth) rawData.dateOfBirth = this.formatDate(rawData.dateOfBirth);
  if (rawData.dateOfJoining) rawData.dateOfJoining = this.formatDate(rawData.dateOfJoining);

  const formData = new FormData();
  formData.append(
    'employee',
    new Blob([JSON.stringify(rawData)], { type: 'application/json' })
  );

   if (this.selectedProfileImage) formData.append('profileImage', this.selectedProfileImage);
  if (this.selectedResume) formData.append('resume', this.selectedResume);

  this.httpClient.post<Employee1>('http://localhost:8080/api/employees', formData).subscribe({
    next: (res) => {
      console.log('Employee saved successfully:', res);
    },
    error: (err) => {
      console.error('Error saving employee:', err);
    }
  });
}

formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // JS months are 0-based
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

onFileSelect(event: any, fileType: 'profile' | 'resume') {
  const file = event.target.files[0];
  if (fileType === 'profile') this.selectedProfileImage = file;
  if (fileType === 'resume') this.selectedResume = file;
}

  getAllEmployees() {
    this.employeeService.getAllEmployees().subscribe((data: Employee1[]) => {
      this.employees = data;
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/employee_table']);
  }

  showMenu(event: MouseEvent) {
    this.menu.toggle(event);
  }

  onGlobalFilter(event: Event, table: Table) {
    const input = (event.target as HTMLInputElement).value;
    table.filterGlobal(input, 'contains');
  }
}