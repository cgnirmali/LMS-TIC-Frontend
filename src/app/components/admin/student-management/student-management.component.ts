import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-student-management',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, FontAwesomeModule, HttpClientModule],
  templateUrl: './student-management.component.html',
  styleUrl: './student-management.component.css'
})
export class StudentManagementComponent  implements OnInit {
  selectedClassId: string = '';
  userRole: string = 'staff'; // Example role
  classes: any[] = [];
  filteredStudents: any[] = [];
  
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getAllStudents();
  }

  getAllStudents() {
    this.http.get<any[]>('https://localhost:7265/api/Student/Get-All-Students')
      .subscribe(response => {
        this.filteredStudents = response.map(student => ({
          id: student.id,
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email,
          phoneNumber: student.phoneNumber,
          createdDate: student.createdDate,
          class: student.class || { className: 'N/A' },
          nic: student.nic,
          utNumber: student.utNumber,
          gender: student.gender,
          adminVerify: student.adminVerify,
          address: student.address
        }));
      });
  }

  onClassChange() {
    // Handle class filtering logic here
  }

  DeleteStudent(studentId: string) {
    if (confirm("Are you sure you want to delete this student?")) {
      console.log("Deleting student with ID:", studentId);
    }
  }

  EditStudent(studentId: string) {
    console.log("Editing student with ID:", studentId);
  }
}
