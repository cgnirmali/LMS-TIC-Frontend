import { Component, OnInit } from '@angular/core';
import {  BatchService } from '../../../services/batch.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Batch, Course } from '../../../services/models/models';
import {  CourseService } from '../../../services/course.service';

@Component({
  selector: 'app-batch-course',
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './batch-course.component.html',
  styleUrl: './batch-course.component.css'
})
export class BatchCourseComponent implements OnInit {
  batchForm: FormGroup;
  batches: Batch[] = [];
  courses: Course[] = [];
  newBatchName: string = '';
  newCourseName: string = '';
  selectedBatchId: string | null = null;


  constructor(private fb: FormBuilder, private batchService: BatchService,private courseService:CourseService) {
    this.batchForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  ngOnInit(): void {
    this.loadBatches();
    this.loadCourses();

  }

  loadBatches(): void {
    this.batchService.getAllBatches().subscribe({
      next: (data: Batch[]) => {
        console.log('Batches:', data);
        this.batches = data; // data is now a clean array from $values
      },
      error: (err) => {
        console.error('Error fetching batches', err);
      }
    });
  }
  loadCourses(): void {
    this.courseService.getAllCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
        console.log('Courses loaded:', this.courses);
      },
      error: (error) => {
        console.error('Error loading courses', error);
      }
    });
  }
  AddBatch(): void {
    if (!this.newBatchName.trim()) {
      return;
    }
    this.batchService.addBatch({ name: this.newBatchName }).subscribe({
      next: (batch) => {
        this.batches.push(batch);
        this.newBatchName = '';
      },
      error: (err) => {
        console.error('Error adding batch', err);
      }
    });
  }
  getBatchName(batchId: string): string | null {
    const batch = this.batches.find(b => b.id === batchId);
    return batch ? batch.name : null;
  }
  DeleteBatch(id: string | undefined): void {
    if (!id) return;
    this.batchService.rejectBatch(id).subscribe({
      next: () => {
        this.batches = this.batches.filter(batch => batch.id !== id);
      },
      error: (err) => {
        console.error('Error deleting batch:', err);
      }
    });
  }

  AddCourse(): void {
    if (!this.newCourseName.trim() || !this.selectedBatchId) {
      console.error('Course name or Batch not selected');
      return;
    }
  
    const newCourse = {
      name: this.newCourseName,
      batchId: this.selectedBatchId
    };
  
    this.courseService.addCourse(newCourse).subscribe({
      next: (course) => {
        this.courses.push(course);
        this.newCourseName = '';
        this.selectedBatchId = null;
      },
      error: (err) => {
        console.error('Error adding course', err);
      }
    });
  }
  
  DeleteCourse(id: string): void {
    if (!id) return;
    
    this.courseService.deleteCourse(id).subscribe({
      next: () => {
        this.courses = this.courses.filter(course => course.id !== id);
        console.log('Course deleted successfully');
      },
      error: (err) => {
        console.error('Error deleting course:', err);
      }
    });
  }
  
}