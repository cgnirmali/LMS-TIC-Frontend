import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = 'http://localhost:5055/api/Student';  

  constructor(private http: HttpClient) {}

  getStudents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Get-All-Students`);
  }
  
// Add a new student
addStudent(student: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/Add-new-student`, student);
}

// Update an existing student
updateStudent(id: string, student: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/Update-Student/${id}`, student);
}
  
  // You can add other methods for adding, updating, deleting students as needed.
}