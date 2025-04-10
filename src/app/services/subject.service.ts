import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Course, Subject, SubjectListResponse } from './models/models';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private apiUrl = 'https://localhost:7265/api/Subject'; // <-- your correct backend API

  constructor(private http: HttpClient) { }

  getAllSubjects(): Observable<Subject[]> {
    return this.http.get<SubjectListResponse>(`${this.apiUrl}`).pipe(
      map(response => response.$values)  // if your API returns {$id, $values: [...]}
    );
  }

  addSubject(subjectData: { name: string; description: string; courseId: string }): Observable<Subject> {
    return this.http.post<Subject>(`${this.apiUrl}`, subjectData);
  }

  deleteSubject(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}