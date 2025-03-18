import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  private staffUrl ='https://localhost:7265/api/Staff/Add_Staff';
  private GetAllUrl = 'https://localhost:7265/api/Staff/Get_All_Staff';
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

      // Verify student by ID
      verifyStudent(staffId: number): Observable<any> {
        return this.http.post(`${this.staffUrl}?staffId=${staffId}`,{});
      }
  getAllStudents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.GetAllUrl}`);
  }
}
