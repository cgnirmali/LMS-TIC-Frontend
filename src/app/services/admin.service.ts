import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private verifyUrl ='https://localhost:7265/api/User/Verify-student';
  private studentsUrl = 'https://localhost:7265/api/Student/Get-All-Students';
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

      // Verify student by ID
      verifyStudent(studentId: number): Observable<any> {
        return this.http.post(`${this.verifyUrl}?studentId=${studentId}`,{});
      }
  getAllStudents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.studentsUrl}`);
  }
}
