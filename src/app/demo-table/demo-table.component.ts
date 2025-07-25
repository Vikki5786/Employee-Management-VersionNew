// import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import {  MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { DropdownModule } from "primeng/dropdown";
import { MultiSelect } from "primeng/multiselect";
import { Calendar } from "primeng/calendar";
import { SelectModule } from "primeng/select";
import { Table, TableModule } from 'primeng/table';
import { SelectButton } from 'primeng/selectbutton';
// import { CommonModule } from '@angular/common';
import { Employee } from '../employee';
import { ToggleButton } from 'primeng/togglebutton';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeTableComponent } from '../employee-table/employee-table.component';
import { EmployeeService } from '../employee.service';

// 
// import { Component, OnInit } from '@angular/core';
// import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { RouterModule } from '@angular/router';
// 

import { Router } from '@angular/router';


///////
import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { Ripple } from 'primeng/ripple';
import { MenubarModule, Menubar, } from 'primeng/menubar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { Menu } from 'primeng/menu';
import { IconField } from "primeng/iconfield";
import { InputIcon } from "primeng/inputicon";

/////////////
@Component({
  selector: 'app-demo-table',
  standalone: true,
  imports: [
    CommonModule, BadgeModule, AvatarModule, InputTextModule, Ripple,
    SelectModule, FormsModule, TableModule, RouterModule,
    Menubar, MenubarModule, OverlayPanelModule,
    Menu,
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
 @ViewChild('menu') menu!: Menu; 
// employees: Employee[] = [];
//   balanceFrozen = false;

// constructor(private employeeService: EmployeeService) {}

    // items: MenuItem[] | undefined;

    // home: MenuItem | undefined;

    // ngOnInit() {
    //     this.items = [
    //       { icon: 'pi pi-file-import' },{icon: 'pi pi-eye'},
    //       {icon: 'pi pi-verified'},{icon: 'pi pi-user-edit'}, 
    //       {icon: 'pi pi-plus'},{icon:'pi pi-file-pdf'},{icon: 'pi pi-filter'},
    //       {icon:'pi pi-file-export'},{icon: 'pi pi-history'},{icon:'pi pi-check'},
        
   
    items: MenuItem[] | undefined;
  constructor(private router: Router) {}

    // ngOnInit() {
    //     this.items = [
    //         {
    //             label: 'Home',
    //             icon: 'pi pi-home',
    //         },
    //         {
    //             label: 'Projects',
    //             icon: 'pi pi-search',
    //             badge: '3',
    //             items: [
    //                 {
    //                     label: 'Core',
    //                     icon: 'pi pi-bolt',
    //                     shortcut: '⌘+S',
    //                 },
    //                 {
    //                     label: 'Blocks',
    //                     icon: 'pi pi-server',
    //                     shortcut: '⌘+B',
    //                 },
    //                 {
    //                     separator: true,
    //                 },
    //                 {
    //                     label: 'UI Kit',
    //                     icon: 'pi pi-pencil',
    //                     shortcut: '⌘+U',
    //                 },
    //             ],
    //         },
    //     ];
    // }

    ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/dashboard'
      },
      {
        label: 'Profile',
        icon: 'pi pi-user',
        routerLink: '/profile'
      },
    ];
  }

  logout() {
    // your logout logic here (e.g. clear token, redirect to login)
    localStorage.clear();
    this.router.navigate(['/employee_table']);
  }

  onSettings() {
  console.log('Settings clicked');
  // Navigate to settings page
}

onLogout() {
  console.log('Logout clicked');
      this.router.navigate(['/employee_table']);

  // Perform logout logic here (clear token, redirect)
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

showMenu(event: MouseEvent) {
    this.menu.toggle(event);  // ✅ No more error here
  }

  onGlobalFilter(event: Event, table: Table) {
      const input = (event.target as HTMLInputElement).value;
      table.filterGlobal(input, 'contains');
    }
}

