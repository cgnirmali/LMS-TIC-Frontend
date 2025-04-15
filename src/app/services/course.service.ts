import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Course, CourseApiResponse } from './models/models';



@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'https://localhost:7265/api'; // <-- Your base URL

  constructor(private http: HttpClient) {}

  getAllCourses(): Observable<Course[]> {
    return this.http.get<CourseApiResponse>(`${this.apiUrl}/Course`)
      .pipe(
        map(response => response.$values) // Only take the list of courses
      );
  }

  addCourse(courseData: { name: string; batchId: string }): Observable<Course> {
    return this.http.post<Course>(`${this.apiUrl}/Course`, courseData);
  }
  deleteCourse(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Course/${id}`);
  }
  
}