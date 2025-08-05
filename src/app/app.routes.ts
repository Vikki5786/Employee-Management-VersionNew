import { Routes } from '@angular/router';
import { EmployeePageComponent } from './employee-page/employee-page.component';
import { EmployeeTableComponent } from './employee-table/employee-table.component';
import { DemoTableComponent } from './demo-table/demo-table.component';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { EmployeeFormComponent } from './employee-form/employee-form.component';

export const routes: Routes = [
  { path: 'employee', component: EmployeePageComponent },
  // { path: 'employee-form', component: EmployeeFormComponent },
  { path: 'employee_table', component: EmployeeTableComponent },
  {path: 'demo_table',component:DemoTableComponent},
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: 'employee', pathMatch: 'full' }
];
