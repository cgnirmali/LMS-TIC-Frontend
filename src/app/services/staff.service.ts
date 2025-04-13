import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Staff } from './models/models';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  private apiUrl = 'https://localhost:7265/api/Staff'; // Change to your real API endpoint

  constructor(private http: HttpClient) {}

  getAllStaffs(): Observable<Staff[]> {
    return this.http.get<Staff[]>(`${this.apiUrl}/Get_All_Staff`);
  }

  addStaff(staff: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Add_Staff`, staff);
  }

  deleteStaff(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateStaff(id: number, staff: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/Update_Staff/${id}`, staff);  // Fixed URL
  }
  
  getStaffById(id: number): Observable<Staff> {
    return this.http.get<Staff>(`${this.apiUrl}/${id}`);
  }
}