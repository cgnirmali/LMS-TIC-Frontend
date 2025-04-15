import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Schedule, ScheduleService } from '../../../services/schedule.service';
import { Group, GroupService } from '../../../services/group.service';
import { PdfDownloadService } from '../../../services/pdf-download.service';
import { TypeOfClass } from './type-of-class.enum';

@Component({
  selector: 'app-schedule',
  imports: [FormsModule, CommonModule],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css',
})
export class ScheduleComponent implements OnInit {
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

  onCreate(scheduleId: number, selectedDate: Date) {
    this.showModal = true;
    console.log(this.showModal);
    this.selectedDate = selectedDate;
    this.selectedScheduleId = scheduleId;
  }

  onEditSchedule(selectedScheduleDetailId: number, selectedDate: Date) {
    this.showModal2 = true;
    this.selectedScheduleDetailId = selectedScheduleDetailId;

    this.selectedDate = selectedDate;

    // Get schedule details
    this.scheduleService
      .getScheduleById(this.selectedScheduleDetailId)
      .subscribe((data) => {
        this.selectedGroupId = data.groupId;
        this.typeOfClassValue = data.typeOfClass;
        this.description = data.description;
        this.startTime = data.startTime;
        this.endTime = data.endTime;
        this.cellNumber = data.cellNumber;
      });
  }

  oncloseSchedule() {
    this.showModal = false;
  }

  //HOLIDAY  EDITTTTTTTTT
  onEditHoliday(selectedHolidayDetailId: number, selectedDate: Date) {
    console.log(selectedHolidayDetailId);

    this.showModal3 = true;
    this.selectedHolidayDetailId = selectedHolidayDetailId;

    this.selectedDate = selectedDate;

    // Get schedule details
    this.scheduleService
      .getHolidayById(this.selectedHolidayDetailId)
      .subscribe((data) => {
        this.holidayName = data.holiday;
      });
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

  createScheduleTable() {
    // alert('Create Schedule Table clicked!');

    if (this.selectedYear !== undefined && this.selectedMonth !== undefined) {
      this.scheduleService
        .postSchedule(this.selectedYear, this.selectedMonth)
        .subscribe({
          next: (res) => {
            console.log('Schedule generated:', res);
            // Reload the schedules
            // this.getSchedules(year, month);
             window.location.reload();
          },
          error: (err) => {
            console.error('Error generating schedule:', err);
          },
        });
    }
  }
  convertTo12HourWithoutAmPm(time24: string): string {
    const [hour, minute] = time24.split(':');
    let hourNum = parseInt(hour, 10);
    hourNum = hourNum % 12 || 12; // convert 00 → 12
    return `${hourNum.toString().padStart(2, '0')}:${minute}:00`;
  }
  

  saveSchedule() {
    console.log(this.typeOfClassValue);
    if (this.scheduleType == 'class') {
      const ScheduleDetail = {
        scheduleId: this.selectedScheduleId,
        groupId: this.selectedGroupId,
        description: this.description,
        startTime: this.convertTo12HourWithoutAmPm(this.startTime),
        endTime:this.convertTo12HourWithoutAmPm(this.endTime),
        typeOfClass: this.typeOfClassValue,
        cellNumber: this.cellNumber,
      };

      this.scheduleService.postScheduleClass(ScheduleDetail).subscribe({
        next: (response) => {
          console.log('Schedule saved successfully', response);
          // alert('Schedule saved successfully!');
          this.showModal = false;
        },
        error: (error) => {
          console.error('Error saving schedule', error);
          alert('Failed to save schedule. Please try again.');
        },
      });
    } else {
      const HolidayDetail = {
        scheduleId: this.selectedScheduleId,
        holiday: this.holidayName,
      };

      this.scheduleService.postScheduleHoliday(HolidayDetail).subscribe({
        next: (response) => {
          console.log('HolidayDetail saved successfully', response);
          // alert('HolidayDetail saved successfully!');
          this.showModal = false;
        },
        error: (error) => {
          console.error('Error saving HolidayDetail', error);
          alert('Failed to save HolidayDetail. Please try again.');
        },
      });
    }
  }

  updateSchedule() {
    const UpdateScheduleDetail = {
      groupId: this.selectedGroupId,
      description: this.description,
      startTime: this.startTime,
      endTime: this.endTime,
      typeOfClass: this.typeOfClassValue,
      cellNumber: this.cellNumber,
    };
    console.log(this.selectedScheduleDetailId);
    if (this.selectedScheduleDetailId !== null) {
      this.scheduleService
        .updateScheduleDetail(
          UpdateScheduleDetail,
          this.selectedScheduleDetailId
        )
        .subscribe({
          next: (response) => {
            console.log('Schedule saved successfully', response);
            // alert('Schedule saved successfully!');
            this.showModal2 = false;
          },
          error: (error) => {
            console.error('Error saving schedule', error);
            alert('Failed to save schedule. Please try again.');
          },
        });
    } else {
      alert('Invalid schedule detail ID');
    }
  }



  onDeleteScheduleDetail() {
    if (this.selectedScheduleDetailId !== null) {
      this.scheduleService.deleteScheduleDetail(this.selectedScheduleDetailId ).subscribe({
        next: () => {
          // alert(' deleted successfully');
          this.showModal2 = false;
          // Refresh your student list here
        },
        error: (err) => {
          console.error('Delete failed', err);
        }
      });
    }
  }

  updateHoliday() {
    const UpdateHolidayDetail = {
      holiday: this.holidayName,
    };

    if (this.selectedHolidayDetailId !== null) {
      this.scheduleService
        .updateHoliday(UpdateHolidayDetail, this.selectedHolidayDetailId)
        .subscribe({
          next: (response) => {
            console.log('Schedule saved successfully', response);
            // alert('Schedule saved successfully!');
            this.showModal3 = false;
          },
          error: (error) => {
            console.error('Error saving schedule', error);
            alert('Failed to save schedule. Please try again.');
          },
        });
    } else {
      alert('Invalid schedule detail ID');
    }
  }



  onDeleteHoliday() {
    if (this.selectedHolidayDetailId !== null) {
      this.scheduleService.deleteHoliday(this.selectedHolidayDetailId ).subscribe({
        next: () => {
          // alert(' deleted successfully');
          this.showModal3 = false;
          // Refresh your student list here
        },
        error: (err) => {
          console.error('Delete failed', err);
        }
      });
    }
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
