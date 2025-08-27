import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PanelMenu } from "primeng/panelmenu";
import { MenuItem } from 'primeng/api';
import { Employee } from './employee';
import { SelectButton } from "primeng/selectbutton";
import { SelectModule } from "primeng/select";
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet, 
    // PanelMenu,
    
    SelectModule,FormsModule,TableModule
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'employee-app';

// items: MenuItem[] = [
//     {
//       label: 'Dashboard',
//       icon: 'pi pi-home',
//       routerLink: ['/dashboard']
//     },
//     {
//       label: 'Employees',
//       icon: 'pi pi-users',
//       routerLink: ['/employees']
//     }
//   ];
}
