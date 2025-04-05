import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from './models.ts/models';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = 'http://localhost:5055/api/Student';  // Change the URL as per your API

  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/Get-All-Students`);
  }
  
// Add a new student
addStudent(student: Student): Observable<any> {
  return this.http.post(`${this.apiUrl}/Add-new-student`, student);
}

// Update an existing student
updateStudent(id: string, student: Student): Observable<any> {
  return this.http.put(`${this.apiUrl}/Update-Student/${id}`, student);
}
  
  // You can add other methods for adding, updating, deleting students as needed.
}