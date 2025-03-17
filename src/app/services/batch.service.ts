import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BatchService {
  private apiUrl = 'https://localhost:7265/api/Batch'; 

  constructor(private http: HttpClient) {}

  // Get all batches
  getBatches(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Add a new batch
  addBatch(name: string): Observable<any> {
    return this.http.post<any>(this.apiUrl , { name }).pipe(
      catchError((error) => {
        return throwError(() => error); 
      })
    );
  }
  // Delete a batch
  deleteBatch(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
