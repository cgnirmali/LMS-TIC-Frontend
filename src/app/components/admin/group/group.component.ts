import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GroupService, Group } from '../../../services/group.service';
import {  CourseService } from '../../../services/course.service';

@Component({
  selector: 'app-group',
  standalone: true, // Ensure the component is standalone if using in Angular 14+ (optional)
  imports: [CommonModule, ReactiveFormsModule], // Remove RouterLink here if not used
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'] // Corrected from styleUrl to styleUrls
})
export class GroupComponent implements OnInit {
  groupForm: FormGroup;
  groups: Group[] = [];
  courses: any[] = []; 
  errorMessage: string = '';
  isModalOpen: boolean = false;

  constructor(
    private fb: FormBuilder,
    private groupService: GroupService,
    private courseService: CourseService  // Inject CourseService
  ) {
    this.groupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      courseId: ['', Validators.required]  // Add validation for course selection
    });
  }

  ngOnInit(): void {
    this.loadGroups();
    this.loadCourses();  // Call method to load courses
  }

  loadGroups(): void {
    this.groupService.getGroups().subscribe(
      (data: Group[]) => {
        this.groups = data;
      },
      (error: any) => {
        this.errorMessage = 'Failed to load groups';
      }
    );
  }

  // Load courses from the backend
  loadCourses(): void {
    // this.courseService.getCourses().subscribe(
    //   (data: Course[]) => {
    //     this.courses = data;
    //   },
    //   (error: any) => {
    //     this.errorMessage = 'Failed to load courses';
    //   }
    // );
  }

  openModal(): void {
    this.isModalOpen = true;
    this.errorMessage = '';
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.groupForm.reset();
  }

  addGroup(): void {
    if (this.groupForm.valid) {
      this.groupService.addGroup(this.groupForm.value).subscribe(
        (response: Group) => {
          this.groups.push(response);
          this.groupForm.reset();
          this.closeModal();
        },
        (error: any) => {
          this.errorMessage = 'Failed to add group';
        }
      );
    }
  }

  approveGroup(id: number): void {
    this.groupService.approveGroup(id).subscribe(
      () => {
        // Update group status or reload
        this.loadGroups();
      },
      (error: any) => {
        this.errorMessage = 'Failed to approve group';
      }
    );
  }

  rejectGroup(id: number): void {
    this.groupService.rejectGroup(id).subscribe(
      () => {
        // Update group status or reload
        this.loadGroups();
      },
      (error: any) => {
        this.errorMessage = 'Failed to reject group';
      }
    );
  }
}