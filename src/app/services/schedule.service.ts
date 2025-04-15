import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private baseUrl = 'https://localhost:7265/api/Schedule';
  private scheduleUrl = 'https://localhost:7265/api/ScheduleDetail'
  private holidayUrl = 'https://localhost:7265/api/Holiday'

  // https://localhost:7265/api/Schedule/generate/2025/5
  constructor(private http: HttpClient) {}
  
  getSchedules(year: number, month: number): Observable<Schedule[]> {
    const url = `${this.baseUrl}/by-month-year`;
    const params = new HttpParams()
      .set('year', year.toString())
      .set('month', month.toString());
  
    return this.http.get<Schedule[]>(url, { params });
  }

  postSchedule(year: number, month: number) {
    const url = `${this.baseUrl}/generate/${year}/${month}`;
    return this.http.post(url, {}); 
  }

  postScheduleClass(ScheduleDetail: any): Observable<any> {
    return this.http.post(this.scheduleUrl, ScheduleDetail); 
  }

  postScheduleHoliday(HolidayDetail: any): Observable<any> {
    return this.http.post(this.holidayUrl, HolidayDetail); 
  }


    // DELETE method
    deleteScheduleDetail(selectedScheduleDetailId: number) {
      return this.http.delete(`${this.scheduleUrl}/${selectedScheduleDetailId}`);
    }


    deleteHoliday(Id: number) {
      return this.http.delete(`${this.holidayUrl}/${Id}`);
    }


  getScheduleById(selectedScheduleDetailId: number) {
    return this.http.get<any>(`${this.scheduleUrl}/${selectedScheduleDetailId}`);
  }

  getHolidayById(selectedHolidayDetailId: number) {
    return this.http.get<any>(`${this.holidayUrl}/${selectedHolidayDetailId}`);
  }
  updateScheduleDetail(UpdateScheduleDetail: any, selectedScheduleDetailId: number) {
    return this.http.put(`${this.scheduleUrl}/${selectedScheduleDetailId}`, UpdateScheduleDetail);
  }

  updateHoliday(UpdateHolidayDetail: any, selectedHolidayDetailId: number) {
    return this.http.put(`${this.holidayUrl}/${selectedHolidayDetailId}`, UpdateHolidayDetail);
  }
  
}

export interface Schedule {
  scheduleId: string;
  date: string;
  classSchedule: number;
  scheduleDetail: ScheduleDetail[];
  holidayDetail: { holidayName: string } | null;
}


export interface UpdateScheduleDetail {
  startTime: string;
  endTime: string;
  description: string;
  typeOfClass: number;
  groupId: string;
  cellNumber: number;

}


export interface ScheduleDetail {
  startTime: string;
  endTime: string;
  description: string;
  typeOfClass: number;
  groupId: string;
  cellNumber: number;
  scheduleId: string;
 
}


export interface HolidayDetail {
  holiday : string
  scheduleId: string;
}


export interface UpdateHolidayDetail {
  holiday : string

}