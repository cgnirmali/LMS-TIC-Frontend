import { Component } from '@angular/core';
import { Group, GroupService } from '../../../../services/group.service';
import { TypeOfClass } from '../../../admin/schedule/type-of-class.enum';
import { ScheduleService } from '../../../../services/schedule.service';
import { PdfDownloadService } from '../../../../services/pdf-download.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-studentschedule',
  imports: [FormsModule, CommonModule],
  templateUrl: './studentschedule.component.html',
  styleUrl: './studentschedule.component.css'
})
export class StudentscheduleComponent {

  

   selectedYear: number | undefined;
    selectedMonth: number | undefined;
    yearList: number[] = [];
  
    isWeeklyView = false; // Default monthly view
  
    toggleView() {
      this.isWeeklyView = !this.isWeeklyView;
    }
    showCreateButton: boolean = false;
    monthList = [
      { value: 1, name: 'January' },
      { value: 2, name: 'February' },
      { value: 3, name: 'March' },
      { value: 4, name: 'April' },
      { value: 5, name: 'May' },
      { value: 6, name: 'June' },
      { value: 7, name: 'July' },
      { value: 8, name: 'August' },
      { value: 9, name: 'September' },
      { value: 10, name: 'October' },
      { value: 11, name: 'November' },
      { value: 12, name: 'December' },
    ];
    scheduleData: any[] = [];
  
    showModal = false;
    selectedDate: Date | null = null;
    selectedScheduleId: number | null = null;
    scheduleType: 'holiday' | 'class' = 'class';
  
    holidayName = '';
  
    description = '';
    startTime = '';
    endTime = '';
    cellNumber: number | null = null;
  
    groupName = ' ';
    groups: Group[] = [];
    selectedGroupId: string = '';
    cellNumbersByDate: { [date: string]: number } = {};
  
    TypeOfClass = TypeOfClass;
  
    typeOfClassValue: TypeOfClass = TypeOfClass.Session;
  
    onTypeChange(value: any) {
      this.typeOfClassValue = +value;
    }
  
    showModal2 = false;
    showModal3 = false;
    selectedScheduleDetailId: number | null = null;
    selectedHolidayDetailId: number | null = null;
  
    constructor(
      private scheduleService: ScheduleService,
      private groupService: GroupService,
      private pdfDownloadService: PdfDownloadService
    ) {}
  
    ngOnInit() {
      const currentDate = new Date();
      this.selectedYear = currentDate.getFullYear();
      this.selectedMonth = currentDate.getMonth() + 1;
  
      this.populateYearList();
      this.onFilterChange();
      this.loadGroups();
    }
  
    populateYearList() {
      for (let year = 2024; year <= 2030; year++) {
        this.yearList.push(year);
      }
    }
    onFilterChange() {
      if (this.selectedYear && this.selectedMonth) {
        this.getSchedules(this.selectedYear, this.selectedMonth);
      }
    }
  
    loadGroups() {
      this.groupService.getGroups().subscribe((data) => {
        this.groups = data;
        console.log(data);
      });
    }
  
    getSchedules(year: number, month: number) {
      this.scheduleService.getSchedules(year, month).subscribe({
        next: (data: any) => {
          this.scheduleData = data.$values;
  
          if (this.scheduleData.length === 0) {
            this.showCreateButton = true;
          } else {
            console.log(this.scheduleData);
            this.updateWeeklySchedule();
            this.showCreateButton = false;
          }
        },
        error: (err) => {
          console.error('Error fetching schedules:', err);
          this.scheduleData = [];
        },
      });
    }
  
    getScheduleByClassType(schedule: any, type: number): any[] {
      const scheduleDetails = schedule.scheduleDetail?.$values || [];
      //   console.log(scheduleDetails)
      // console.log( scheduleDetails.filter((item: any) => item.typeOfClass === type) || [])
      return (
        scheduleDetails.filter((item: any) => item.typeOfClass === type) || []
      );
    }
  

   
    getCellNumber(schedule: any, rowIndex: number): number {
      return this.getNextCellNumber(schedule.date); // Get specific cell number per date
    }
  
    getNextCellNumber(date: string): number {
      if (!this.cellNumbersByDate[date]) {
        this.cellNumbersByDate[date] = 1;
      } else if (this.cellNumbersByDate[date] < 12) {
        this.cellNumbersByDate[date]++;
      }
      return this.cellNumbersByDate[date];
    }
  
    oncloseScheduleUpdate() {
      this.showModal2 = false;
    }
    oncloseHolidayUpdate() {
      this.showModal3 = false;
    }
  
   
 
    
  
  
  
  
  
  
   
  
  
    
    currentWeekIndex = 0;
    weeklySchedule: any[] = [];
  
    updateWeeklySchedule() {
      const start = this.currentWeekIndex * 7;
      const end = start + 7;
      this.weeklySchedule = this.scheduleData.slice(start, end);
    }
  
    nextWeek() {
      if ((this.currentWeekIndex + 1) * 7 < this.scheduleData.length) {
        this.currentWeekIndex++;
        this.updateWeeklySchedule();
      }
    }
  
    previousWeek() {
      if (this.currentWeekIndex > 0) {
        this.currentWeekIndex--;
        this.updateWeeklySchedule();
      }
    }
  
    downloadElementAsPDF(): void {
      // Assuming the weekly view HTML element has id="weeklySchedule"
      this.pdfDownloadService.downloadElementAsPDF(
        'weeklySchedule',
        'weekly_schedule.pdf'
      );
    }
  }
