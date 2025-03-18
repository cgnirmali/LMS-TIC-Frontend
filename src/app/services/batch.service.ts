import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

export interface Batch {
  id: number;
  name: string;
  // Add other properties as needed
}

@Injectable({
  providedIn: 'root'
})
export class BatchService {
  private apiUrl = 'https://localhost:7265/api/Batch'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) { }

  getBatches(): Observable<Batch[]> {
    return this.http.get<Batch[]>(this.apiUrl);
  }

  addBatch(batch: { name: string }): Observable<Batch> {
    return this.http.post<Batch>(this.apiUrl, batch);
  }

  approveBatch(id: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, {});
  }

  rejectBatch(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, {});
    }
  }