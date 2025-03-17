import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@Component({
  selector: 'app-lecturer-management',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, FontAwesomeModule, HttpClientModule],
  templateUrl: './lecturer-management.component.html',
  styleUrl: './lecturer-management.component.css'
})
export class LecturerManagementComponent{
  teachers: any;
  DeleteTeacher(arg0: any) {
  throw new Error('Method not implemented.');
  }
  EditTeacher(arg0: any) {
  throw new Error('Method not implemented.');
  }
  
  }
  