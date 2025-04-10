import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Batch, BatchApiResponse } from './models/models';



@Injectable({
  providedIn: 'root'
})
export class BatchService {
  private apiUrl = 'https://localhost:7265/api/Batch'; // Update your API URL if needed

  constructor(private http: HttpClient) {}

  addBatch(batch: Partial<Batch>): Observable<Batch> {
    return this.http.post<Batch>(this.apiUrl, batch);
  }

  getAllBatches(): Observable<Batch[]> {
    return this.http.get<BatchApiResponse>(this.apiUrl).pipe(
      map(response => response.$values) // Extract the array from the response
    );
  }

  approveBatch(id: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, {});
  }

  rejectBatch(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, {});
  }
}