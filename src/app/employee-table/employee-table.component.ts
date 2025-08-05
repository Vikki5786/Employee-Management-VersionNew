import { Table, TableModule } from "primeng/table";
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { InputIcon } from "primeng/inputicon";
import { SelectModule } from 'primeng/select';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from "primeng/toast";
import { MessageService, MenuItem, ConfirmationService } from 'primeng/api';
import { ButtonModule } from "primeng/button";
import { DragDropModule } from 'primeng/dragdrop';
import { CommonModule } from '@angular/common';
import { Employee } from '../employee';
import { ContextMenuModule } from "primeng/contextmenu";
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DialogModule } from "primeng/dialog";
import { FileUpload, FileUploadHandlerEvent } from 'primeng/fileupload';
import { ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { HttpClientModule } from "@angular/common/http";
import { CalendarModule } from 'primeng/calendar';
import { DatePickerModule } from "primeng/datepicker";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ToggleButton } from 'primeng/togglebutton';
import { FormControl, } from '@angular/forms';
import { MultiSelect } from "primeng/multiselect";
import { Calendar } from "primeng/calendar";
import { SelectButton } from 'primeng/selectbutton';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { Ripple } from 'primeng/ripple';
import { MenubarModule, Menubar, } from 'primeng/menubar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { Menu } from 'primeng/menu';
import { IconField } from "primeng/iconfield";
import { Router, RouterModule } from "@angular/router";
interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

interface ExportColumn {
  title: string;
  dataKey: string;
}

interface City {
  name: string;
  code: string;
}

interface State {
  name: string;
  code: string;
  cities: City[];
}

interface Country {
  name: string;
  code: string;
  states: State[];
}

@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [TableModule, FormsModule, CommonModule,
    SelectModule, ToggleButton,CommonModule, BadgeModule, AvatarModule, InputTextModule, Ripple,
    SelectModule, FormsModule, TableModule, RouterModule,
    Menubar, MenubarModule, OverlayPanelModule,
    Menu,
    ToolbarModule, ReactiveFormsModule, AutoCompleteModule, CalendarModule,
    InputIcon, CheckboxModule, DropdownModule, InputTextModule, TextareaModule, HttpClientModule, DatePickerModule,
    DragDropModule, ToastModule, ButtonModule, ContextMenuModule, IconFieldModule, InputIconModule, DialogModule, FileUpload],
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.css',
  providers: [MessageService, ConfirmationService],
  styles: [
    `:host ::ng-deep  .p-frozen-column {
            font-weight: bold;
        }
        :host ::ng-deep .p-datatable-frozen-tbody {
            font-weight: bold;
        }`
  ],
})

export class EmployeeTableComponent implements OnInit {
  balanceFrozen: boolean = false;
  uploadedProfileImages: any[] = [];
  @ViewChild('profileUploader') profileUploader!: FileUpload;
   @ViewChild('menu') menu!: Menu; 

  employeeDialog: boolean = false;
  selectedEmployees: Employee[] | null = null;
  menuItems: any[] = [];
  editingEmployee = false;
  skills = ['Java', 'Angular', 'Spring Boot', 'MySQL'];
  selectedSkill: string = '';
  filteredSkills: string[] = [];
  employees: Employee[] = [];
  form!: FormGroup;
  countryOptions: Country[] = [];
  uploadedResumes: any[] = [];
  safeUrl: SafeResourceUrl | undefined;
  submitted: boolean = false;
  statuses!: any[];
  @ViewChild('dt') dt!: Table;
  employeeForm!: FormGroup;
  countryDropdownOptions: any[] = [];
  stateDropdownOptions: any[] = [];
  cityDropdownOptions: any[] = [];
  stateOptions: State[] = [];
  cityOptions: City[] = [];
  selectedCountry!: Country;
  selectedState!: State;
  selectedCity!: City;
  //  items: MenuItem[] | undefined;
  items: MenuItem[] = [];

  showMenu(event: MouseEvent) {
    this.menu.toggle(event);  // ✅ No more error here
  }
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
   logout() {
    // your logout logic here (e.g. clear token, redirect to login)
    localStorage.clear();
    this.router.navigate(['/demo_table']);
  }
  genders = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Others', value: 'Others' }
  ];

  skillsList = ['Java', 'Angular', 'Spring Boot', 'MySQL', 'Python'];

  maritalStatusOptions = [
    { label: 'Single', value: 'Single' },
    { label: 'Married', value: 'Married' },
    { label: 'Divorced', value: 'Divorced' },
  ];

  onRowReorder(event: any) {
    console.log('Row reordered:', event);
    // You can update your data source if needed
  }


  countries: Country[] = [
    {
      name: 'India',
      code: 'IN',
      states: [
        {
          name: 'Tamil Nadu',
          code: 'TN',
          cities: [
            { name: 'Chennai', code: 'CHN' },
            { name: 'Coimbatore', code: 'CBE' }
          ]
        },
        {
          name: 'Karnataka',
          code: 'KA',
          cities: [
            { name: 'Bangalore', code: 'BLR' },
            { name: 'Mysore', code: 'MYS' }
          ]
        }
      ]
    },
    {
      name: 'USA',
      code: 'US',
      states: [
        {
          name: 'California',
          code: 'CA',
          cities: [
            { name: 'Los Angeles', code: 'LA' },
            { name: 'San Francisco', code: 'SF' }
          ]
        }
      ]
    }
  ];
  leftFrozenColumns: any[] | undefined;
  leftFrozenRows: any[] | undefined;
  displayDialog: any;


  onCountryChange(country: Country) {
    this.selectedCountry = country;
    this.stateOptions = country?.states || [];
    this.cityOptions = [];
    this.employeeForm.patchValue({ country: country.name, state: '', city: '' });
  }

  onSubmit() {
    const formData = this.employeeForm.value;

    const employee = {
      ...formData,
      country: { name: formData.country },
      state: { name: formData.state },
      city: { name: formData.city }
    };

    this.employees.push(employee);
    this.employeeForm.reset();
  }


  onStateChange(state: State) {
    this.selectedState = state;
    this.cityOptions = state?.cities || [];
    this.employeeForm.patchValue({ state: state.name, city: '' });
  }

  onCityChange(city: City) {
    this.selectedCity = city;
    this.employeeForm.patchValue({ city: city.name });
  }

  statusOptions = [
    { label: 'Active', value: 'Active' },
    { label: 'Inactive', value: 'Inactive' }
  ];

  constructor(
    private messageService: MessageService,
    private sanitizer: DomSanitizer,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,public router: Router
  ) { }

  cols: Column[] = [];
  switchingRow = false;
  exportColumns!: ExportColumn[];
  loading: boolean = false;
  sizes!: any[];
  selectedSize: 'small' | 'large' | undefined = undefined;
  selectedEmployee: Employee | null = null;

  filterSkills(event: any) {
    this.filteredSkills = this.skillsList.filter(skill =>
      skill.toLowerCase().includes(event.query.toLowerCase())
    );
  }

  selectedLocation: any;

  openNew() {
    this.employeeForm.reset();
    this.employeeDialog = true;
    this.editingEmployee = false;
  }

  onProfileImageUpload(event: FileUploadHandlerEvent): void {
    for (const file of event.files) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.uploadedProfileImages.push({
          name: file.name,
          type: file.type,
          previewUrl: e.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  }

  @ViewChild('resumeUploader') resumeUploader!: FileUpload;


  onResumeUpload(event: any) {
    const files = event.files || event.originalEvent?.files || [];
    this.uploadedResumes = [...this.uploadedResumes, ...files];
  }

  getImagePreview(file: File): string | null {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      const imageElement = document.querySelector(`img[alt='Preview'][src='']`);
      if (imageElement) {
        (imageElement as HTMLImageElement).src = result;
      }
    };
    return '';
  }


  openEdit() {
    if (!this.selectedEmployees || this.selectedEmployees.length === 0) return;

    const emp = this.selectedEmployees[0];
    this.employeeForm.patchValue(emp);
    this.employeeDialog = true;
    this.editingEmployee = true;
  }



  saveEmployee() {
    if (this.editingEmployee) {
      const index = this.employees.findIndex(e => e.emailId === this.employeeForm.value.email);
      this.employees[index] = this.employeeForm.value;
      this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Employee Updated' });
    } else {
      this.employees.push(this.employeeForm.value);
      this.messageService.add({ severity: 'success', summary: 'Added', detail: 'Employee Added' });
    }
    this.employeeDialog = false;
    this.employeeForm.reset();
  }

  hideDialog() {
    this.employeeDialog = false;
  }
  onRowSelect(event: any) {
    this.messageService.add({ severity: 'info', summary: 'Selected', detail: event.data.firstName });
  }

  onRowUnselect(event: any) {
    this.messageService.add({ severity: 'warn', summary: 'Unselected', detail: event.data.firstName });
  }

  confirmDelete() {
    if (!this.selectedEmployees || this.selectedEmployees.length === 0) return;

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete selected employee(s)?',
      accept: () => {
        this.employees = this.employees.filter(emp => !this.selectedEmployees!.includes(emp));
        this.messageService.add({
          severity: 'success',
          summary: 'Deleted',
          detail: 'Employee Deleted'
        });
      }
    });
  }

  cancelEmployee() {
    this.employeeForm.reset();
    this.employeeDialog = false;
    this.editingEmployee = false;
  }


  setProfileUrl(url: string) {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  resumePreviewUrl(file: File): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      URL.createObjectURL(file)
    );
  }
  

  ngOnInit() {

    const exampleUrl = 'https://example.com/sample.pdf';

    this.setProfileUrl(exampleUrl);


    // this.items = [
    //   { label: 'View', icon: 'pi pi-fw pi-search', command: () => this.viewEmployee(this.selectedEmployee!) },
    //   { label: 'Delete', icon: 'pi pi-fw pi-times', command: () => this.deleteEmployee(this.selectedEmployee!) }
    // ];

    this.sizes = [
      { name: 'Small', value: 'small' },
      { name: 'Normal', value: undefined },
      { name: 'Large', value: 'large' }
    ];
    this.selectedSize = undefined;

    this.cols = [
      { field: 'employeeCode', header: 'Code', customExportHeader: 'Employee Code' },
      { field: 'firstName', header: 'First Name' },
      { field: 'lastName', header: 'Last Name' },
      { field: 'emailId', header: 'Email ID' },
      { field: 'phoneNumber', header: 'Phone Number' },
      { field: 'gender', header: 'Gender' },
      { field: 'dateOfBirth', header: 'Date of Birth' },
      { field: 'maritalStatus', header: 'Marital Status' },
      { field: 'nationality', header: 'Nationality' },
      { field: 'country', header: 'Country' },
      { field: 'state', header: 'State' },
      { field: 'city', header: 'City' },
      { field: 'zipCode', header: 'Pincode' },
      { field: 'address', header: 'Address' },
      { field: 'designation', header: 'Designation' },
      { field: 'job', header: 'Job' },
      { field: 'dateOfJoining', header: 'Date of Joining' },
      { field: 'experience', header: 'Experience' },
      { field: 'salary', header: 'Salary' },
      { field: 'reportingManager', header: 'Manager' },
      { field: 'status', header: 'Status' },
      { field: 'skills', header: 'Skills' },
      { field: 'profileImage', header: 'Profile Image' },
      { field: 'resume', header: 'Resume' }
    ];


    this.exportColumns = this.cols.map(col => ({
      title: col.header,
      dataKey: col.field
    }));

    this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));

    this.employeeForm = this.fb.group({
      employeeCode: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailId: ['', Validators.required],
      phoneNumber: [''],
      gender: [''],
      dateOfBirth: [''],
      maritalStatus: [''],
      nationality: [''],
      country: [''],
      state: [''],
      city: [''],
      zipCode: [''],
      address: [''],
      designation: [''],
      job: [''],
      dateOfJoining: [''],
      experience: [''],
      salary: [''],
      reportingManager: [''],
      status: ['Active'],
      skills: [[]],
      profileImage: [null],
      resume: [null]
    });


    this.countryOptions = this.countries;

    this.countryDropdownOptions = this.countries.map(c => ({
      label: c.name,
      value: c
    }));

    this.menuItems = [
      {
        label: 'Edit',
        icon: 'pi pi-pencil',
        command: () => this.openEdit()
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => this.confirmDelete()
      }
    ];

    this.employees = [
      {
        employeeCode: 'EMP001',
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '9876543210',
        emailId: 'john.doe@example.com',
        gender: 'Male',
        dateOfBirth: new Date(1990, 4, 15),
        maritalStatus: 'Married',
        nationality: 'Indian',
        country: 'India',
        state: 'Telangana',
        city: 'Hyderabad',
        zipCode: '500001',
        address: '123 Main Street',
        designation: 'Senior Developer',
        job: 'Software Engineer',
        dateOfJoining: new Date(2015, 0, 1),
        experience: '8 years',
        salary: 75000,
        reportingManager: 'Jane Smith',
        status: 'Active',
        skills: ['Java', 'Spring Boot'],
        profileImage: 'John_Doe.jpg',
        resume: 'john_resume.pdf'
      },
      {
        employeeCode: 'EMP002',
        firstName: 'Alice',
        lastName: 'Johnson',
        phoneNumber: '9123456780',
        emailId: 'alice.johnson@example.com',
        gender: 'Female',
        dateOfBirth: new Date(1988, 10, 5),
        maritalStatus: 'Single',
        nationality: 'Indian',
        country: 'India',
        state: 'Maharashtra',
        city: 'Mumbai',
        zipCode: '400001',
        address: '45 Ocean View',
        designation: 'UI/UX Designer',
        job: 'Design Lead',
        dateOfJoining: new Date(2017, 6, 20),
        experience: '6 years',
        salary: 68000,
        reportingManager: 'Robert King',
        status: 'Active',
        skills: ['Figma', 'Sketch', 'HTML'],
        profileImage: 'Alice_Johnson.jpeg',
        resume: 'Alice_resume.pdf'
      },
      {
        employeeCode: 'EMP003',
        firstName: 'Ravi',
        lastName: 'Kumar',
        phoneNumber: '9988776655',
        emailId: 'ravi.kumar@example.com',
        gender: 'Male',
        dateOfBirth: new Date(1992, 1, 10),
        maritalStatus: 'Married',
        nationality: 'Indian',
        country: 'India',
        state: 'Karnataka',
        city: 'Bangalore',
        zipCode: '560001',
        address: '22 Tech Park',
        designation: 'Backend Developer',
        job: 'Java Developer',
        dateOfJoining: new Date(2019, 2, 5),
        experience: '4 years',
        salary: 60000,
        reportingManager: 'Anita Rao',
        status: 'Active',
        skills: ['Java', 'Spring Boot', 'Hibernate'],
        profileImage: 'Ravi_Kumar.jpeg',
        resume: 'Ravi_Kumar.pdf'
      },
      {
        employeeCode: 'EMP004',
        firstName: 'Priya',
        lastName: 'Mehta',
        phoneNumber: '9876123450',
        emailId: 'priya.mehta@example.com',
        gender: 'Female',
        dateOfBirth: new Date(1995, 7, 25),
        maritalStatus: 'Single',
        nationality: 'Indian',
        country: 'India',
        state: 'Delhi',
        city: 'New Delhi',
        zipCode: '110001',
        address: '8 Green Avenue',
        designation: 'Frontend Developer',
        job: 'Angular Developer',
        dateOfJoining: new Date(2021, 5, 10),
        experience: '2 years',
        salary: 55000,
        reportingManager: 'Rahul Verma',
        status: 'Active',
        skills: ['Angular', 'TypeScript', 'CSS'],
        profileImage: '',
        resume: ''
      },
      {
        employeeCode: 'EMP005',
        firstName: 'Amit',
        lastName: 'Patel',
        phoneNumber: '9012345678',
        emailId: 'amit.patel@example.com',
        gender: 'Male',
        dateOfBirth: new Date(1985, 3, 18),
        maritalStatus: 'Married',
        nationality: 'Indian',
        country: 'India',
        state: 'Gujarat',
        city: 'Ahmedabad',
        zipCode: '380001',
        address: '56 Market Street',
        designation: 'Project Manager',
        job: 'Team Lead',
        dateOfJoining: new Date(2012, 8, 12),
        experience: '11 years',
        salary: 95000,
        reportingManager: 'Sanjay Kapoor',
        status: 'Active',
        skills: ['Agile', 'Scrum', 'JIRA'],
        profileImage: 'amit_patel.jpg',
        resume: 'amit_resume.pdf'
      },
      {
        employeeCode: 'EMP006',
        firstName: 'Sneha',
        lastName: 'Reddy',
        phoneNumber: '9876541230',
        emailId: 'sneha.reddy@example.com',
        gender: 'Female',
        dateOfBirth: new Date(1993, 11, 30),
        maritalStatus: 'Single',
        nationality: 'Indian',
        country: 'India',
        state: 'Tamil Nadu',
        city: 'Chennai',
        zipCode: '600001',
        address: '19 Lotus Colony',
        designation: 'QA Engineer',
        job: 'Tester',
        dateOfJoining: new Date(2018, 3, 15),
        experience: '5 years',
        salary: 52000,
        reportingManager: 'Karthik Iyer',
        status: 'Active',
        skills: ['Selenium', 'TestNG', 'Postman'],
        profileImage: '',
        resume: 'sneha_reddy.pdf'
      },
      {
        employeeCode: 'EMP007',
        firstName: 'Manoj',
        lastName: 'Sharma',
        phoneNumber: '9888123456',
        emailId: 'manoj.sharma@example.com',
        gender: 'Male',
        dateOfBirth: new Date(1991, 6, 10),
        maritalStatus: 'Married',
        nationality: 'Indian',
        country: 'India',
        state: 'Rajasthan',
        city: 'Jaipur',
        zipCode: '302001',
        address: '101 City Center',
        designation: 'DevOps Engineer',
        job: 'Infrastructure',
        dateOfJoining: new Date(2016, 10, 25),
        experience: '7 years',
        salary: 70000,
        reportingManager: 'Nikhil Bansal',
        status: 'Active',
        skills: ['AWS', 'Docker', 'Jenkins'],
        profileImage: '',
        resume: ''
      },
      {
        employeeCode: 'EMP008',
        firstName: 'Neha',
        lastName: 'Singh',
        phoneNumber: '9798564321',
        emailId: 'neha.singh@example.com',
        gender: 'Female',
        dateOfBirth: new Date(1994, 2, 12),
        maritalStatus: 'Single',
        nationality: 'Indian',
        country: 'India',
        state: 'Punjab',
        city: 'Amritsar',
        zipCode: '143001',
        address: '14 Lotus Garden',
        designation: 'Data Analyst',
        job: 'Analytics',
        dateOfJoining: new Date(2020, 9, 3),
        experience: '3 years',
        salary: 58000,
        reportingManager: 'Deepak Malhotra',
        status: 'Active',
        skills: ['SQL', 'Python', 'Power BI'],
        profileImage: '',
        resume: ''
      },
      {
        employeeCode: 'EMP009',
        firstName: 'Vikram',
        lastName: 'Rao',
        phoneNumber: '9876012345',
        emailId: 'vikram.rao@example.com',
        gender: 'Male',
        dateOfBirth: new Date(1989, 5, 22),
        maritalStatus: 'Married',
        nationality: 'Indian',
        country: 'India',
        state: 'Kerala',
        city: 'Kochi',
        zipCode: '682001',
        address: '9 Lake View',
        designation: 'System Administrator',
        job: 'IT Support',
        dateOfJoining: new Date(2014, 1, 10),
        experience: '9 years',
        salary: 62000,
        reportingManager: 'Meera Nair',
        status: 'Active',
        skills: ['Linux', 'Networking', 'Shell Scripting'],
        profileImage: 'vikram_rao.jpeg',
        resume: 'vikram_rao_resume.pdf'
      },
      {
        employeeCode: 'EMP010',
        firstName: 'Anjali',
        lastName: 'Kapoor',
        phoneNumber: '9087654321',
        emailId: 'anjali.kapoor@example.com',
        gender: 'Female',
        dateOfBirth: new Date(1996, 8, 18),
        maritalStatus: 'Single',
        nationality: 'Indian',
        country: 'India',
        state: 'Uttar Pradesh',
        city: 'Lucknow',
        zipCode: '226001',
        address: '67 Sunrise Apartments',
        designation: 'HR Executive',
        job: 'Human Resources',
        dateOfJoining: new Date(2022, 0, 5),
        experience: '1 year',
        salary: 48000,
        reportingManager: 'Vivek Tiwari',
        status: 'Active',
        skills: ['Recruitment', 'Onboarding', 'Payroll'],
        profileImage: '',
        resume: ''
      },

      {
        employeeCode: 'EMP011',
        firstName: 'Rahul',
        lastName: 'Saxena',
        phoneNumber: '9871234560',
        emailId: 'rahul.saxena@example.com',
        gender: 'Male',
        dateOfBirth: new Date(1991, 2, 17),
        maritalStatus: 'Married',
        nationality: 'Indian',
        country: 'India',
        state: 'Madhya Pradesh',
        city: 'Bhopal',
        zipCode: '462001',
        address: '23 Hilltop Street',
        designation: 'Software Engineer',
        job: 'Backend Developer',
        dateOfJoining: new Date(2016, 10, 2),
        experience: '7 years',
        salary: 67000,
        reportingManager: 'Praveen Joshi',
        status: 'Active',
        skills: ['Java', 'MySQL', 'REST API'],
        profileImage: '',
        resume: ''
      },
      {
        employeeCode: 'EMP012',
        firstName: 'Kiran',
        lastName: 'Deshmukh',
        phoneNumber: '9812345678',
        emailId: 'kiran.deshmukh@example.com',
        gender: 'Female',
        dateOfBirth: new Date(1993, 9, 9),
        maritalStatus: 'Single',
        nationality: 'Indian',
        country: 'India',
        state: 'Maharashtra',
        city: 'Pune',
        zipCode: '411001',
        address: '58 Tech Street',
        designation: 'Cloud Engineer',
        job: 'Cloud Services',
        dateOfJoining: new Date(2020, 3, 11),
        experience: '3 years',
        salary: 72000,
        reportingManager: 'Swati Kulkarni',
        status: 'Active',
        skills: ['AWS', 'Azure', 'Docker'],
        profileImage: '',
        resume: ''
      },
      {
        employeeCode: 'EMP013',
        firstName: 'Arjun',
        lastName: 'Verma',
        phoneNumber: '9123456789',
        emailId: 'arjun.verma@example.com',
        gender: 'Male',
        dateOfBirth: new Date(1987, 11, 30),
        maritalStatus: 'Married',
        nationality: 'Indian',
        country: 'India',
        state: 'Uttarakhand',
        city: 'Dehradun',
        zipCode: '248001',
        address: '4 Pine Hill',
        designation: 'Senior QA Engineer',
        job: 'Testing',
        dateOfJoining: new Date(2013, 5, 20),
        experience: '10 years',
        salary: 80000,
        reportingManager: 'Manisha Kapoor',
        status: 'Active',
        skills: ['JUnit', 'Selenium', 'TestRail'],
        profileImage: 'arjun_verma.jpeg',
        resume: 'arjun_verma.pdf'
      },
      {
        employeeCode: 'EMP014',
        firstName: 'Tanya',
        lastName: 'Chatterjee',
        phoneNumber: '9898989898',
        emailId: 'tanya.chatterjee@example.com',
        gender: 'Female',
        dateOfBirth: new Date(1997, 4, 11),
        maritalStatus: 'Single',
        nationality: 'Indian',
        country: 'India',
        state: 'West Bengal',
        city: 'Kolkata',
        zipCode: '700001',
        address: '12 Lake Town',
        designation: 'Content Strategist',
        job: 'Content Creation',
        dateOfJoining: new Date(2021, 8, 14),
        experience: '2 years',
        salary: 46000,
        reportingManager: 'Ritika Dey',
        status: 'Active',
        skills: ['SEO', 'Copywriting', 'Analytics'],
        profileImage: '',
        resume: ''
      },
      {
        employeeCode: 'EMP015',
        firstName: 'Siddharth',
        lastName: 'Iyer',
        phoneNumber: '9834567890',
        emailId: 'siddharth.iyer@example.com',
        gender: 'Male',
        dateOfBirth: new Date(1990, 6, 2),
        maritalStatus: 'Married',
        nationality: 'Indian',
        country: 'India',
        state: 'Tamil Nadu',
        city: 'Coimbatore',
        zipCode: '641001',
        address: '77 Green Valley',
        designation: 'Mobile Developer',
        job: 'React Native Developer',
        dateOfJoining: new Date(2017, 9, 9),
        experience: '6 years',
        salary: 69000,
        reportingManager: 'Ajay Mehta',
        status: 'Active',
        skills: ['React Native', 'iOS', 'Android'],
        profileImage: '',
        resume: ''
      },
      {
        employeeCode: 'EMP016',
        firstName: 'Divya',
        lastName: 'Nair',
        phoneNumber: '9801234567',
        emailId: 'divya.nair@example.com',
        gender: 'Female',
        dateOfBirth: new Date(1992, 5, 24),
        maritalStatus: 'Married',
        nationality: 'Indian',
        country: 'India',
        state: 'Kerala',
        city: 'Thiruvananthapuram',
        zipCode: '695001',
        address: '29 Beach Road',
        designation: 'Business Analyst',
        job: 'Analysis',
        dateOfJoining: new Date(2018, 1, 19),
        experience: '5 years',
        salary: 64000,
        reportingManager: 'Harish Menon',
        status: 'Active',
        skills: ['Excel', 'Power BI', 'JIRA'],
        profileImage: '',
        resume: ''
      },
      {
        employeeCode: 'EMP017',
        firstName: 'Nikhil',
        lastName: 'Singhania',
        phoneNumber: '9823456712',
        emailId: 'nikhil.singhania@example.com',
        gender: 'Male',
        dateOfBirth: new Date(1988, 3, 5),
        maritalStatus: 'Married',
        nationality: 'Indian',
        country: 'India',
        state: 'Jharkhand',
        city: 'Ranchi',
        zipCode: '834001',
        address: '67 Skyline Road',
        designation: 'Database Administrator',
        job: 'DBA',
        dateOfJoining: new Date(2012, 6, 6),
        experience: '11 years',
        salary: 85000,
        reportingManager: 'Mehul Arora',
        status: 'Active',
        skills: ['Oracle', 'MySQL', 'PL/SQL'],
        profileImage: '',
        resume: ''
      },
      {
        employeeCode: 'EMP018',
        firstName: 'Meera',
        lastName: 'Joshi',
        phoneNumber: '9811123456',
        emailId: 'meera.joshi@example.com',
        gender: 'Female',
        dateOfBirth: new Date(1995, 0, 20),
        maritalStatus: 'Single',
        nationality: 'Indian',
        country: 'India',
        state: 'Himachal Pradesh',
        city: 'Shimla',
        zipCode: '171001',
        address: '22 Ridge View',
        designation: 'Marketing Executive',
        job: 'Digital Marketing',
        dateOfJoining: new Date(2021, 4, 1),
        experience: '2 years',
        salary: 50000,
        reportingManager: 'Rohan Mehta',
        status: 'Active',
        skills: ['Google Ads', 'Email Marketing', 'Canva'],
        profileImage: '',
        resume: ''
      },
      {
        employeeCode: 'EMP019',
        firstName: 'Gaurav',
        lastName: 'Khandelwal',
        phoneNumber: '9798123456',
        emailId: 'gaurav.khandelwal@example.com',
        gender: 'Male',
        dateOfBirth: new Date(1998, 2, 28),
        maritalStatus: 'Single',
        nationality: 'Indian',
        country: 'India',
        state: 'Haryana',
        city: 'Gurgaon',
        zipCode: '122001',
        address: '51 Tower View',
        designation: 'Support Engineer',
        job: 'Tech Support',
        dateOfJoining: new Date(2022, 6, 10),
        experience: '1 year',
        salary: 42000,
        reportingManager: 'Sonal Mahajan',
        status: 'Active',
        skills: ['Technical Support', 'CRM', 'Remote Tools'],
        profileImage: '',
        resume: ''
      },
      {
        employeeCode: 'EMP020',
        firstName: 'Sweta',
        lastName: 'Mishra',
        phoneNumber: '9787012345',
        emailId: 'sweta.mishra@example.com',
        gender: 'Female',
        dateOfBirth: new Date(1994, 7, 8),
        maritalStatus: 'Single',
        nationality: 'Indian',
        country: 'India',
        state: 'Odisha',
        city: 'Bhubaneswar',
        zipCode: '751001',
        address: '11 Palm Heights',
        designation: 'Graphic Designer',
        job: 'Visual Design',
        dateOfJoining: new Date(2019, 9, 15),
        experience: '4 years',
        salary: 53000,
        reportingManager: 'Rajeev Mohanty',
        status: 'Active',
        skills: ['Photoshop', 'Illustrator', 'Figma'],
        profileImage: '',
        resume: ''
      },

      {
        employeeCode: 'EMP021',
        firstName: 'Ashok',
        lastName: 'Gupta',
        phoneNumber: '9811112233',
        emailId: 'ashok.gupta@example.com',
        gender: 'Male',
        dateOfBirth: new Date(1986, 8, 14),
        maritalStatus: 'Married',
        nationality: 'Indian',
        country: 'India',
        state: 'Uttar Pradesh',
        city: 'Noida',
        zipCode: '201301',
        address: '77 Sector 15',
        designation: 'Technical Architect',
        job: 'Architecture',
        dateOfJoining: new Date(2010, 6, 5),
        experience: '13 years',
        salary: 120000,
        reportingManager: 'Ravi Malhotra',
        status: 'Active',
        skills: ['System Design', 'Microservices', 'Java'],
        profileImage: '',
        resume: ''
      },
      {
        employeeCode: 'EMP022',
        firstName: 'Lata',
        lastName: 'Sharma',
        phoneNumber: '9822223344',
        emailId: 'lata.sharma@example.com',
        gender: 'Female',
        dateOfBirth: new Date(1990, 2, 28),
        maritalStatus: 'Single',
        nationality: 'Indian',
        country: 'India',
        state: 'Rajasthan',
        city: 'Udaipur',
        zipCode: '313001',
        address: '45 Lakeview Road',
        designation: 'Recruiter',
        job: 'Talent Acquisition',
        dateOfJoining: new Date(2019, 11, 1),
        experience: '4 years',
        salary: 45000,
        reportingManager: 'Manisha Agarwal',
        status: 'Active',
        skills: ['Hiring', 'Communication', 'ATS'],
        profileImage: '',
        resume: ''
      },
      {
        employeeCode: 'EMP023',
        firstName: 'Zaid',
        lastName: 'Khan',
        phoneNumber: '9844455566',
        emailId: 'zaid.khan@example.com',
        gender: 'Male',
        dateOfBirth: new Date(1995, 3, 7),
        maritalStatus: 'Single',
        nationality: 'Indian',
        country: 'India',
        state: 'Telangana',
        city: 'Warangal',
        zipCode: '506001',
        address: '109 MG Road',
        designation: 'Support Analyst',
        job: 'Client Support',
        dateOfJoining: new Date(2022, 1, 10),
        experience: '1 year',
        salary: 39000,
        reportingManager: 'Rekha Rao',
        status: 'Active',
        skills: ['Tickets', 'Client Calls', 'Excel'],
        profileImage: '',
        resume: ''
      },
      {
        employeeCode: 'EMP024',
        firstName: 'Saurav',
        lastName: 'Bhattacharya',
        phoneNumber: '9855566677',
        emailId: 'saurav.b@example.com',
        gender: 'Male',
        dateOfBirth: new Date(1992, 10, 3),
        maritalStatus: 'Married',
        nationality: 'Indian',
        country: 'India',
        state: 'West Bengal',
        city: 'Howrah',
        zipCode: '711101',
        address: '32 Kali Temple Lane',
        designation: 'ML Engineer',
        job: 'AI/ML Developer',
        dateOfJoining: new Date(2020, 2, 5),
        experience: '3 years',
        salary: 88000,
        reportingManager: 'Anjali Sen',
        status: 'Active',
        skills: ['Python', 'TensorFlow', 'Pandas'],
        profileImage: '',
        resume: ''
      },
      {
        employeeCode: 'EMP025',
        firstName: 'Jyoti',
        lastName: 'Mishra',
        phoneNumber: '9866677788',
        emailId: 'jyoti.mishra@example.com',
        gender: 'Female',
        dateOfBirth: new Date(1989, 6, 22),
        maritalStatus: 'Married',
        nationality: 'Indian',
        country: 'India',
        state: 'Bihar',
        city: 'Patna',
        zipCode: '800001',
        address: '18 Ashok Nagar',
        designation: 'Technical Writer',
        job: 'Documentation',
        dateOfJoining: new Date(2017, 8, 12),
        experience: '6 years',
        salary: 52000,
        reportingManager: 'Rahul Taneja',
        status: 'Active',
        skills: ['Markdown', 'Confluence', 'Docs'],
        profileImage: '',
        resume: ''
      },
      {
        employeeCode: 'EMP026',
        firstName: 'Farhan',
        lastName: 'Ali',
        phoneNumber: '9877788899',
        emailId: 'farhan.ali@example.com',
        gender: 'Male',
        dateOfBirth: new Date(1996, 11, 18),
        maritalStatus: 'Single',
        nationality: 'Indian',
        country: 'India',
        state: 'Andhra Pradesh',
        city: 'Vijayawada',
        zipCode: '520001',
        address: '85 Sunrise Enclave',
        designation: 'Cybersecurity Analyst',
        job: 'Security',
        dateOfJoining: new Date(2021, 3, 20),
        experience: '2 years',
        salary: 74000,
        reportingManager: 'Vikas Sharma',
        status: 'Active',
        skills: ['Firewalls', 'Ethical Hacking', 'SIEM'],
        profileImage: '',
        resume: ''
      },
      {
        employeeCode: 'EMP027',
        firstName: 'Snehal',
        lastName: 'Kulkarni',
        phoneNumber: '9888899900',
        emailId: 'snehal.k@example.com',
        gender: 'Female',
        dateOfBirth: new Date(1991, 1, 2),
        maritalStatus: 'Single',
        nationality: 'Indian',
        country: 'India',
        state: 'Goa',
        city: 'Panaji',
        zipCode: '403001',
        address: '202 Riverwalk',
        designation: 'Legal Advisor',
        job: 'Legal',
        dateOfJoining: new Date(2018, 5, 30),
        experience: '5 years',
        salary: 61000,
        reportingManager: 'Rajdeep Ghosh',
        status: 'Active',
        skills: ['Contracts', 'Compliance', 'Legal Research'],
        profileImage: '',
        resume: ''
      },
      {
        employeeCode: 'EMP028',
        firstName: 'Dev',
        lastName: 'Yadav',
        phoneNumber: '9899900011',
        emailId: 'dev.yadav@example.com',
        gender: 'Male',
        dateOfBirth: new Date(1987, 0, 5),
        maritalStatus: 'Married',
        nationality: 'Indian',
        country: 'India',
        state: 'Chhattisgarh',
        city: 'Raipur',
        zipCode: '492001',
        address: '111 Harmony Complex',
        designation: 'Network Engineer',
        job: 'Network Admin',
        dateOfJoining: new Date(2014, 11, 5),
        experience: '9 years',
        salary: 69000,
        reportingManager: 'Suraj Batra',
        status: 'Active',
        skills: ['Cisco', 'LAN', 'WAN'],
        profileImage: '',
        resume: ''
      },
      {
        employeeCode: 'EMP029',
        firstName: 'Ayesha',
        lastName: 'Sheikh',
        phoneNumber: '9900011223',
        emailId: 'ayesha.sheikh@example.com',
        gender: 'Female',
        dateOfBirth: new Date(1998, 9, 14),
        maritalStatus: 'Single',
        nationality: 'Indian',
        country: 'India',
        state: 'Assam',
        city: 'Guwahati',
        zipCode: '781001',
        address: '45 Sunrise Garden',
        designation: 'Junior Developer',
        job: 'Web Developer',
        dateOfJoining: new Date(2023, 0, 10),
        experience: '0.5 years',
        salary: 35000,
        reportingManager: 'Arvind Patel',
        status: 'Active',
        skills: ['HTML', 'CSS', 'JavaScript'],
        profileImage: '',
        resume: ''
      },
      {
        employeeCode: 'EMP030',
        firstName: 'Nitin',
        lastName: 'Das',
        phoneNumber: '9911223344',
        emailId: 'nitin.das@example.com',
        gender: 'Male',
        dateOfBirth: new Date(1993, 5, 25),
        maritalStatus: 'Single',
        nationality: 'Indian',
        country: 'India',
        state: 'Tripura',
        city: 'Agartala',
        zipCode: '799001',
        address: '27 Hilltop Avenue',
        designation: 'Data Engineer',
        job: 'ETL Developer',
        dateOfJoining: new Date(2020, 7, 14),
        experience: '3 years',
        salary: 68000,
        reportingManager: 'Priya Verghese',
        status: 'Active',
        skills: ['ETL', 'BigQuery', 'Spark'],
        profileImage: '',
        resume: ''
      },
      {
        employeeCode: 'EMP031',
        firstName: 'Kavya',
        lastName: 'Menon',
        phoneNumber: '9845012345',
        emailId: 'kavya.menon@example.com',
        gender: 'Female',
        dateOfBirth: new Date(1991, 3, 12),
        maritalStatus: 'Married',
        nationality: 'Indian',
        country: 'India',
        state: 'Kerala',
        city: 'Kozhikode',
        zipCode: '673001',
        address: '102 Green Grove',
        designation: 'Scrum Master',
        job: 'Agile Lead',
        dateOfJoining: new Date(2017, 1, 20),
        experience: '6 years',
        salary: 87000,
        reportingManager: 'Rajiv Pillai',
        status: 'Active',
        skills: ['Scrum', 'Agile', 'Team Coordination'],
        profileImage: '',
        resume: ''
      },
      {
        employeeCode: 'EMP032',
        firstName: 'Harsh',
        lastName: 'Sinha',
        phoneNumber: '9826012345',
        emailId: 'harsh.sinha@example.com',
        gender: 'Male',
        dateOfBirth: new Date(1990, 10, 4),
        maritalStatus: 'Married',
        nationality: 'Indian',
        country: 'India',
        state: 'Madhya Pradesh',
        city: 'Indore',
        zipCode: '452001',
        address: '55 Sun City',
        designation: 'Product Manager',
        job: 'Product Owner',
        dateOfJoining: new Date(2015, 5, 12),
        experience: '8 years',
        salary: 110000,
        reportingManager: 'Megha Tripathi',
        status: 'Active',
        skills: ['Product Roadmap', 'JIRA', 'Stakeholder Mgmt'],
        profileImage: '',
        resume: ''
      },
      {
        employeeCode: 'EMP033',
        firstName: 'Ritika',
        lastName: 'Raj',
        phoneNumber: '9876012399',
        emailId: 'ritika.raj@example.com',
        gender: 'Female',
        dateOfBirth: new Date(1994, 6, 19),
        maritalStatus: 'Single',
        nationality: 'Indian',
        country: 'India',
        state: 'Jharkhand',
        city: 'Jamshedpur',
        zipCode: '831001',
        address: '90 Rose Park',
        designation: 'SEO Specialist',
        job: 'Digital Marketing',
        dateOfJoining: new Date(2020, 10, 5),
        experience: '3 years',
        salary: 47000,
        reportingManager: 'Anil Sharma',
        status: 'Active',
        skills: ['SEO', 'Google Analytics', 'Semrush'],
        profileImage: '',
        resume: ''
      },
      {
        employeeCode: 'EMP034',
        firstName: 'Yash',
        lastName: 'Desai',
        phoneNumber: '9867567890',
        emailId: 'yash.desai@example.com',
        gender: 'Male',
        dateOfBirth: new Date(1992, 9, 1),
        maritalStatus: 'Single',
        nationality: 'Indian',
        country: 'India',
        state: 'Gujarat',
        city: 'Surat',
        zipCode: '395003',
        address: '303 Pearl Residency',
        designation: 'QA Automation Engineer',
        job: 'SDET',
        dateOfJoining: new Date(2019, 3, 28),
        experience: '4 years',
        salary: 62000,
        reportingManager: 'Karan Malhotra',
        status: 'Active',
        skills: ['Selenium', 'Cypress', 'Java'],
        profileImage: '',
        resume: ''
      },
      {
        employeeCode: 'EMP035',
        firstName: 'Preeti',
        lastName: 'Kaur',
        phoneNumber: '9818456767',
        emailId: 'preeti.kaur@example.com',
        gender: 'Female',
        dateOfBirth: new Date(1996, 1, 8),
        maritalStatus: 'Single',
        nationality: 'Indian',
        country: 'India',
        state: 'Punjab',
        city: 'Ludhiana',
        zipCode: '141001',
        address: '13 Model Town',
        designation: 'Customer Success Manager',
        job: 'Support Lead',
        dateOfJoining: new Date(2021, 6, 15),
        experience: '2 years',
        salary: 58000,
        reportingManager: 'Anuj Sethi',
        status: 'Active',
        skills: ['CRM', 'Client Handling', 'Email Communication'],
        profileImage: '',
        resume: ''
      },
      {
        employeeCode: 'EMP036',
        firstName: 'Naveen',
        lastName: 'Rao',
        phoneNumber: '9854012345',
        emailId: 'naveen.rao@example.com',
        gender: 'Male',
        dateOfBirth: new Date(1988, 2, 22),
        maritalStatus: 'Married',
        nationality: 'Indian',
        country: 'India',
        state: 'Telangana',
        city: 'Karimnagar',
        zipCode: '505001',
        address: '78 Tech Towers',
        designation: 'Android Developer',
        job: 'Mobile Dev',
        dateOfJoining: new Date(2014, 4, 30),
        experience: '9 years',
        salary: 72000,
        reportingManager: 'Haritha B',
        status: 'Active',
        skills: ['Kotlin', 'Android Studio', 'SQLite'],
        profileImage: '',
        resume: ''
      },
      {
        employeeCode: 'EMP037',
        firstName: 'Tanvi',
        lastName: 'Jain',
        phoneNumber: '9823012345',
        emailId: 'tanvi.jain@example.com',
        gender: 'Female',
        dateOfBirth: new Date(1995, 10, 30),
        maritalStatus: 'Single',
        nationality: 'Indian',
        country: 'India',
        state: 'Himachal Pradesh',
        city: 'Dharamshala',
        zipCode: '176215',
        address: '16 Hilltop Villas',
        designation: 'Graphic Designer',
        job: 'Creative Team',
        dateOfJoining: new Date(2022, 2, 14),
        experience: '1 year',
        salary: 49000,
        reportingManager: 'Ramesh Chauhan',
        status: 'Active',
        skills: ['Photoshop', 'Illustrator', 'InDesign'],
        profileImage: '',
        resume: ''
      },
      {
        employeeCode: 'EMP038',
        firstName: 'Arman',
        lastName: 'Iqbal',
        phoneNumber: '9833212345',
        emailId: 'arman.iqbal@example.com',
        gender: 'Male',
        dateOfBirth: new Date(1989, 4, 4),
        maritalStatus: 'Married',
        nationality: 'Indian',
        country: 'India',
        state: 'Delhi',
        city: 'New Delhi',
        zipCode: '110075',
        address: '402 Capital Residency',
        designation: 'Full Stack Developer',
        job: 'Web Development',
        dateOfJoining: new Date(2016, 7, 9),
        experience: '7 years',
        salary: 85000,
        reportingManager: 'Deepika Singh',
        status: 'Active',
        skills: ['Angular', 'Java', 'MySQL'],
        profileImage: '',
        resume: ''
      },
      {
        employeeCode: 'EMP039',
        firstName: 'Shruti',
        lastName: 'Mali',
        phoneNumber: '9800011223',
        emailId: 'shruti.mali@example.com',
        gender: 'Female',
        dateOfBirth: new Date(1997, 8, 10),
        maritalStatus: 'Single',
        nationality: 'Indian',
        country: 'India',
        state: 'Maharashtra',
        city: 'Nagpur',
        zipCode: '440001',
        address: '50 Lotus Plaza',
        designation: 'HR Generalist',
        job: 'People Ops',
        dateOfJoining: new Date(2023, 0, 18),
        experience: '0.5 years',
        salary: 41000,
        reportingManager: 'Mohit Naik',
        status: 'Active',
        skills: ['HRMS', 'Attendance', 'Employee Engagement'],
        profileImage: '',
        resume: ''
      },
      {
        employeeCode: 'EMP040',
        firstName: 'Rohan',
        lastName: 'Pathak',
        phoneNumber: '9846012345',
        emailId: 'rohan.pathak@example.com',
        gender: 'Male',
        dateOfBirth: new Date(1993, 11, 21),
        maritalStatus: 'Married',
        nationality: 'Indian',
        country: 'India',
        state: 'Odisha',
        city: 'Cuttack',
        zipCode: '753001',
        address: '25 Silver Estate',
        designation: 'DevOps Lead',
        job: 'Infrastructure Engineering',
        dateOfJoining: new Date(2018, 10, 3),
        experience: '5 years',
        salary: 93000,
        reportingManager: 'Ritika Nair',
        status: 'Active',
        skills: ['Kubernetes', 'AWS', 'CI/CD'],
        profileImage: '',
        resume: ''
      },
      {
        employeeCode: 'EMP041',
        firstName: 'Sahil',
        lastName: 'Kumar',
        phoneNumber: '9876500041',
        emailId: 'sahil.kumar@example.com',
        gender: 'Male',
        dateOfBirth: new Date(1992, 9, 12),
        maritalStatus: 'Single',
        nationality: 'Indian',
        country: 'India',
        state: 'Uttar Pradesh',
        city: 'Noida',
        zipCode: '201301',
        address: '41 Green Avenue',
        designation: 'Frontend Developer',
        job: 'Web Developer',
        dateOfJoining: new Date(2020, 2, 10),
        experience: '4 years',
        salary: 55000,
        reportingManager: 'Nikita Sharma',
        status: 'Active',
        skills: ['HTML', 'CSS', 'JavaScript'],
        profileImage: '',
        resume: ''
      },
      {
        employeeCode: 'EMP042',
        firstName: 'Riya',
        lastName: 'Mehra',
        phoneNumber: '9876500042',
        emailId: 'riya.mehra@example.com',
        gender: 'Female',
        dateOfBirth: new Date(1996, 4, 23),
        maritalStatus: 'Single',
        nationality: 'Indian',
        country: 'India',
        state: 'Gujarat',
        city: 'Ahmedabad',
        zipCode: '380001',
        address: '42 Lotus Street',
        designation: 'UI Designer',
        job: 'Designer',
        dateOfJoining: new Date(2019, 10, 5),
        experience: '5 years',
        salary: 52000,
        reportingManager: 'Amit Khanna',
        status: 'Active',
        skills: ['Figma', 'Sketch', 'Photoshop'],
        profileImage: '',
        resume: ''
      },
      {
        employeeCode: 'EMP043',
        firstName: 'Rajeev',
        lastName: 'Verma',
        phoneNumber: '9876500043',
        emailId: 'rajeev.verma@example.com',
        gender: 'Male',
        dateOfBirth: new Date(1985, 6, 19),
        maritalStatus: 'Married',
        nationality: 'Indian',
        country: 'India',
        state: 'Bihar',
        city: 'Patna',
        zipCode: '800001',
        address: '43 Station Road',
        designation: 'Team Lead',
        job: 'Team Leader',
        dateOfJoining: new Date(2010, 0, 1),
        experience: '14 years',
        salary: 95000,
        reportingManager: 'Sunil Rawat',
        status: 'Active',
        skills: ['Agile', 'Scrum', 'Project Management'],
        profileImage: '',
        resume: ''
      },
      {
        employeeCode: 'EMP044',
        firstName: 'Tanya',
        lastName: 'Rao',
        phoneNumber: '9876500044',
        emailId: 'tanya.rao@example.com',
        gender: 'Female',
        dateOfBirth: new Date(1997, 2, 8),
        maritalStatus: 'Single',
        nationality: 'Indian',
        country: 'India',
        state: 'Kerala',
        city: 'Kochi',
        zipCode: '682001',
        address: '44 Palm Grove',
        designation: 'QA Engineer',
        job: 'Tester',
        dateOfJoining: new Date(2022, 3, 20),
        experience: '2 years',
        salary: 48000,
        reportingManager: 'Neha Sinha',
        status: 'Active',
        skills: ['Selenium', 'JIRA'],
        profileImage: '',
        resume: ''
      },
      {
        employeeCode: 'EMP045',
        firstName: 'Ankur',
        lastName: 'Joshi',
        phoneNumber: '9876500045',
        emailId: 'ankur.joshi@example.com',
        gender: 'Male',
        dateOfBirth: new Date(1991, 1, 28),
        maritalStatus: 'Married',
        nationality: 'Indian',
        country: 'India',
        state: 'Madhya Pradesh',
        city: 'Bhopal',
        zipCode: '462001',
        address: '45 Hill View',
        designation: 'DevOps Engineer',
        job: 'Infrastructure Engineer',
        dateOfJoining: new Date(2016, 7, 17),
        experience: '8 years',
        salary: 83000,
        reportingManager: 'Manish Kapoor',
        status: 'Active',
        skills: ['Docker', 'Kubernetes', 'AWS'],
        profileImage: '',
        resume: ''
      },
      {
        employeeCode: 'EMP046',
        firstName: 'Priya',
        lastName: 'Bansal',
        phoneNumber: '9876500046',
        emailId: 'priya.bansal@example.com',
        gender: 'Female',
        dateOfBirth: new Date(1995, 10, 11),
        maritalStatus: 'Single',
        nationality: 'Indian',
        country: 'India',
        state: 'Chandigarh',
        city: 'Chandigarh',
        zipCode: '160017',
        address: '46 Central Park',
        designation: 'Data Scientist',
        job: 'Data Analyst',
        dateOfJoining: new Date(2021, 5, 12),
        experience: '3 years',
        salary: 72000,
        reportingManager: 'Raghav Sethi',
        status: 'Active',
        skills: ['Python', 'Pandas', 'Machine Learning'],
        profileImage: '',
        resume: ''
      },
      {
        employeeCode: 'EMP047',
        firstName: 'Nikhil',
        lastName: 'Yadav',
        phoneNumber: '9876500047',
        emailId: 'nikhil.yadav@example.com',
        gender: 'Male',
        dateOfBirth: new Date(1993, 6, 3),
        maritalStatus: 'Single',
        nationality: 'Indian',
        country: 'India',
        state: 'Jharkhand',
        city: 'Ranchi',
        zipCode: '834001',
        address: '47 City Center',
        designation: 'Android Developer',
        job: 'Mobile Developer',
        dateOfJoining: new Date(2018, 2, 5),
        experience: '6 years',
        salary: 67000,
        reportingManager: 'Anita Roy',
        status: 'Active',
        skills: ['Kotlin', 'Android Studio'],
        profileImage: '',
        resume: ''
      },
      {
        employeeCode: 'EMP048',
        firstName: 'Simran',
        lastName: 'Kaul',
        phoneNumber: '9876500048',
        emailId: 'simran.kaul@example.com',
        gender: 'Female',
        dateOfBirth: new Date(1990, 11, 7),
        maritalStatus: 'Married',
        nationality: 'Indian',
        country: 'India',
        state: 'Jammu and Kashmir',
        city: 'Srinagar',
        zipCode: '190001',
        address: '48 Valley View',
        designation: 'HR Executive',
        job: 'HR',
        dateOfJoining: new Date(2017, 4, 10),
        experience: '7 years',
        salary: 60000,
        reportingManager: 'Karan Talwar',
        status: 'Active',
        skills: ['Recruitment', 'Payroll'],
        profileImage: '',
        resume: ''
      },
      {
        employeeCode: 'EMP049',
        firstName: 'Deepak',
        lastName: 'Pandey',
        phoneNumber: '9876500049',
        emailId: 'deepak.pandey@example.com',
        gender: 'Male',
        dateOfBirth: new Date(1988, 8, 17),
        maritalStatus: 'Married',
        nationality: 'Indian',
        country: 'India',
        state: 'Chhattisgarh',
        city: 'Raipur',
        zipCode: '492001',
        address: '49 Mahadev Marg',
        designation: 'System Administrator',
        job: 'SysAdmin',
        dateOfJoining: new Date(2012, 9, 25),
        experience: '12 years',
        salary: 74000,
        reportingManager: 'Meena Nair',
        status: 'Active',
        skills: ['Linux', 'Networking'],
        profileImage: '',
        resume: ''
      },
      {
        employeeCode: 'EMP050',
        firstName: 'Aishwarya',
        lastName: 'Patel',
        phoneNumber: '9876500050',
        emailId: 'aishwarya.patel@example.com',
        gender: 'Female',
        dateOfBirth: new Date(1994, 3, 21),
        maritalStatus: 'Single',
        nationality: 'Indian',
        country: 'India',
        state: 'Goa',
        city: 'Panaji',
        zipCode: '403001',
        address: '50 Beach Road',
        designation: 'Product Manager',
        job: 'Product Owner',
        dateOfJoining: new Date(2018, 6, 19),
        experience: '6 years',
        salary: 88000,
        reportingManager: 'Dheeraj Kapoor',
        status: 'Active',
        skills: ['Roadmapping', 'Customer Analysis'],
        profileImage: '',
        resume: ''
      }
    ];
  }

  onGlobalFilter(event: Event, table: Table) {
    const input = (event.target as HTMLInputElement).value;
    table.filterGlobal(input, 'contains');
  }

  viewEmployee(employee: Employee) {
    this.messageService.add({ severity: 'info', summary: 'Employee Selected', detail: `${employee.firstName} ${employee.lastName}` });
  }

  deleteEmployee(employee: Employee) {
    this.employees = this.employees.filter((e) => e.emailId !== employee.emailId);
    this.messageService.add({ severity: 'error', summary: 'Employee Deleted', detail: `${employee.firstName} ${employee.lastName}` });
    this.selectedEmployees = null;
  }

  showEmployeeDialog() {
    this.employeeDialog = true;
  }

  hideEmployeeDialog() {
    this.employeeDialog = false;
    this.submitted = false;
  }
}