import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

export interface Group {
  id: number;
  name: string;
  courseName: string; 
  courseId: number; 
}

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private apiUrl = 'https://localhost:7265/api/Group'; 

  constructor(private http: HttpClient) { }

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(this.apiUrl);
  }

  addGroup(group: { name: string }): Observable<Group> {
    return this.http.post<Group>(this.apiUrl, group);
  }

  approveGroup(id: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, {});
  }

  rejectGroup(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, {});
  }
}
