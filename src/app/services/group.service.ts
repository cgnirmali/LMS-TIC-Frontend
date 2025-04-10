import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Group, GroupApiResponse } from './models/models';


@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private apiUrl = 'https://localhost:7265/api/Group';

  constructor(private http: HttpClient) {}

  getGroups(): Observable<Group[]> {
    return this.http.get<GroupApiResponse>(this.apiUrl).pipe(
      map(response => response.$values), // Only extract the $values array
      catchError(error => {
        console.error('Error fetching groups', error);
        return throwError(() => new Error('Error fetching groups'));
      })
    );
  }

  addGroup(group: { name: string; courseId: string }): Observable<Group> {
    return this.http.post<Group>(this.apiUrl, group).pipe(
      catchError(error => {
        console.error('Error adding group', error);
        return throwError(() => new Error('Error adding group'));
      })
    );
  }

  deleteGroup(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error deleting group', error);
        return throwError(() => new Error('Error deleting group'));
      })
    );
  }
}