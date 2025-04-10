import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StudentService } from '../../../services/student.service';

@Component({
  selector: 'app-student-management',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, FontAwesomeModule, HttpClientModule],
  templateUrl: './student-management.component.html',
  styleUrl: './student-management.component.css'
})
export class StudentManagementComponent  implements OnInit {

  selectedClassId: string = '';
  classes: any[] = [];  // Add actual class data
  filteredStudents: any[] = [];  // Array of students
  selectedStudent: any | null = null;  // Variable to hold the selected student details

  registrationForm!: FormGroup; // FormGroup for Add/Edit student form

  constructor(private studentService: StudentService, private fb: FormBuilder) {}

  ngOnInit() {
    this.getAllStudents();
    this.initializeForm();
  }

  // Initialize the student registration form
  initializeForm() {
    this.registrationForm = this.fb.group({
      id: [''], // Add an id field for edit
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

  // Get all students from the API
  getAllStudents() {
    this.studentService.getStudents().subscribe((students) => {
      this.filteredStudents = students;
    });
  }

  viewStudentDetails(student: any) {
    this.selectedStudent = student;
    // Use bootstrap globally without importing explicitly
    const modal = new (window as any).bootstrap.Modal(document.getElementById('studentDetailsModal')!);
    modal.show();
  }

  openAddStudentModal() {
    // Ensure Bootstrap's modal function is available
    const modalElement = document.getElementById('staticBackdrop');
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    } else {
      console.error('Modal element not found');
    }
  }

  // Method to handle edit student action
  EditStudent(studentId: string) {
    // Find the student by id
    const studentToEdit = this.filteredStudents.find(student => student.id === studentId);
    if (studentToEdit) {
      // Populate the form with the student data
      this.registrationForm.patchValue({
        id: studentToEdit.id,
        firstName: studentToEdit.firstName,
        lastName: studentToEdit.lastName,
        nic: studentToEdit.nic,
        phoneNumber: studentToEdit.phoneNumber,
        utNumber: studentToEdit.utNumber,
        gender: studentToEdit.gender,
        address: studentToEdit.address,
        userEmail: studentToEdit.userEmail,
        utEmail: studentToEdit.utEmail || '', // Use an empty string if utEmail is undefined
        utPassword: '', // Leave the password empty or handle as needed
        status: studentToEdit.status
      });
  
      // Open the modal to edit the student
      this.openAddStudentModal();
    }
  }
  

  // Handle submit for Add/Edit student
  onSubmit() {
    if (this.registrationForm.valid) {
      const studentPayload = this.registrationForm.value;
      if (studentPayload.id) {
        // Update existing student
        this.studentService.updateStudent(studentPayload.id, studentPayload)
          .subscribe(() => {
            this.getAllStudents(); // Refresh student list after update
            this.registrationForm.reset();
          });
      } else {
        // Add new student
        this.studentService.addStudent(studentPayload)
          .subscribe(() => {
            this.getAllStudents(); // Refresh student list after add
            this.registrationForm.reset();
          });
      }
    }
  }

  // Filter students by class
  onClassChange() {
    if (this.selectedClassId) {
      this.filteredStudents = this.filteredStudents.filter(student => {
        return student.class === this.selectedClassId;
      });
    } else {
      this.getAllStudents(); // Reset to all students if no class selected
    }
  }

  // Handle delete student action
  DeleteStudent(studentId: string) {
    if (confirm("Are you sure you want to delete this student?")) {
      // Implement delete logic here (similar to how you fetch the students)
    }
  }
}