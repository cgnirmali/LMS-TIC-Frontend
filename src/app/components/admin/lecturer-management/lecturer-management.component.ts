import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@Component({
  selector: 'app-lecturer-management',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, FontAwesomeModule, HttpClientModule],
  templateUrl: './lecturer-management.component.html',
  styleUrl: './lecturer-management.component.css'
})
export class LecturerManagementComponent implements OnInit {
  teachers: any[] = []; // Store teachers data

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadTeachers(); // Fetch teachers on component load
  }

  // Fetch all teachers
  loadTeachers() {
    this.http.get('https://localhost:7265/api/Lecturer/Get_All_Lecturer').subscribe(
      (response: any) => {
        if (response.status === 'success') {
          this.teachers = response.data;
        } else {
          console.error('Failed to fetch teacher data');
        }
      },
      (error) => {
        console.error('API error:', error);
      }
    );
  }

  // Delete teacher
  DeleteTeacher(id: string) {
    if (confirm('Are you sure you want to delete this teacher?')) {
      this.http.delete(`https://localhost:7265/api/Lecturer/Delete_Lecturer/${id}`).subscribe(
        (response: any) => {
          alert('Teacher deleted successfully!');
          this.loadTeachers(); // Reload the teachers list
        },
        (error) => {
          console.error('Error deleting teacher:', error);
        }
      );
    }
  }

  // Edit teacher (this could either navigate to an edit form or populate a form for editing)
  EditTeacher(id: string) {
    console.log('Editing teacher with ID:', id);
    // Logic for editing, either navigate to a new page or open an editing modal/form
    // This will depend on your routing and design
  }
}
