import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OtpService {

  private apiUrl = 'https://localhost:7265/api/User/remove-expired';

  constructor(private http: HttpClient) { }

  removeExpiredOtps(): Observable<any> {
    return this.http.delete(this.apiUrl);
  }
}
