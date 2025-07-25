import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { AppComponent } from './app.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { SelectButton, SelectButtonModule } from 'primeng/selectbutton';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { MessageModule } from 'primeng/message';
import { EmployeePageComponent } from './employee-page/employee-page.component';
import { EmployeeTableComponent } from './employee-table/employee-table.component';
import { SelectModule } from 'primeng/select';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardModule } from 'primeng/card';
import { DemoTableComponent } from './demo-table/demo-table.component';
import { HttpClientModule } from '@angular/common/http';
import { DatePickerModule } from 'primeng/datepicker';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ConfirmationService } from 'primeng/api';
import { FileUploadHandlerEvent } from 'primeng/fileupload';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { RippleModule } from 'primeng/ripple';
import { OverlayPanelModule } from 'primeng/overlaypanel';

@NgModule({
  imports: [
    BrowserModule,DemoTableComponent,HttpClientModule,DatePickerModule,PanelMenuModule,
    ButtonModule,ToolbarModule,DialogModule,CascadeSelectModule,ContextMenuModule,
    FormsModule,CommonModule,
    AutoCompleteModule,CalendarModule,
    InputTextModule,
    ButtonModule,
    TableModule,OverlayPanelModule,
    ToastModule,
    SelectButtonModule,
    ToggleButtonModule,
    MessageModule,
    EmployeePageComponent,
    EmployeeTableComponent,
    SelectModule,
    CheckboxModule,
    DropdownModule,
    BrowserAnimationsModule,
    CardModule,
ReactiveFormsModule,SelectButton,MenubarModule,BadgeModule,AvatarModule,RippleModule,InputTextModule

  ],
  declarations: [],
  bootstrap: []
})
export class AppModule {}
