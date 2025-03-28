import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
  classes: any[] = [];  // Add actual class data
  filteredStudents: any[] = [];
  staffs: any[] = [];
  registrationForm!: FormGroup; // FormGroup for Add/Edit student form

  constructor(private http: HttpClient, private fb: FormBuilder) {}

  ngOnInit() {
    this.getAllStudents();
    this.initializeForm();
  }

  // Initialize the student registration form
  initializeForm() {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      nic: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      utNumber: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      userEmail: ['', [Validators.required, Validators.email]],
      utEmail: ['', [Validators.required, Validators.email]],
      utPassword: ['', [Validators.required, Validators.minLength(6)]],
      status: [0, Validators.required] // default to inactive
    });
  }

  // Get all students
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

  // Handle class change for filtering students
  onClassChange() {
    if (this.selectedClassId) {
      this.filteredStudents = this.filteredStudents.filter(student => student.class.id === this.selectedClassId);
    } else {
      this.getAllStudents(); // Reset to all students if no class selected
    }
  }

  // Handle delete student action
  DeleteStudent(studentId: string) {
    if (confirm("Are you sure you want to delete this student?")) {
      this.http.delete(`https://localhost:7265/api/Student/Delete-Student/${studentId}`)
        .subscribe(() => {
          this.getAllStudents(); // Refresh student list after deletion
        });
    }
  }

  // Handle edit student action
  EditStudent(studentId: string) {
    // Retrieve the student's details from the API (or mock data)
    this.http.get<any>(`https://localhost:7265/api/Student/Get-Student/${studentId}`)
      .subscribe(student => {
        // Fill the form with the student's details
        this.registrationForm.patchValue({
          firstName: student.firstName,
          lastName: student.lastName,
          nic: student.nic,
          phoneNumber: student.phoneNumber,
          utNumber: student.utNumber,
          gender: student.gender,
          address: student.address,
          userEmail: student.email,
          utEmail: student.utEmail,
          utPassword: '',  // Do not pre-fill password for security
          status: student.status
        });
      });
  }

  // Handle submit for Add/Edit student
  onSubmit() {
    if (this.registrationForm.valid) {
      const studentPayload = this.registrationForm.value;
      if (studentPayload.id) {
        // Update existing student
        this.http.put(`https://localhost:7265/api/Student/Update-Student/${studentPayload.id}`, studentPayload)
          .subscribe(() => {
            this.getAllStudents(); // Refresh student list after update
            this.registrationForm.reset();
          });
      } else {
        // Add new student
        this.http.post('https://localhost:7265/api/Student/Add-Student', studentPayload)
          .subscribe(() => {
            this.getAllStudents(); // Refresh student list after add
            this.registrationForm.reset();
          });
      }
    }
  }
}
