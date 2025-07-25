import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-employee-page',
  standalone: true,
  imports: [CommonModule,CheckboxModule,FormsModule],
  templateUrl: './employee-page.component.html',
  styleUrl: './employee-page.component.css'
})

export class EmployeePageComponent  {
 employee = {
    name: '',
    skills: [] as string[]
  };

  allSkills = ['Java', 'Angular', 'Spring Boot', 'MySQL'];

}
