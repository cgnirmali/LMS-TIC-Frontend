import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourseService } from '../../../services/course.service';
import { GroupService } from '../../../services/group.service';
import { SubjectService } from '../../../services/subject.service';
import { Course, Group, Subject } from '../../../services/models/models';

@Component({
  selector: 'app-group-subject',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './group-subject.component.html',
  styleUrl: './group-subject.component.css'
})
export class GroupSubjectComponent implements OnInit {
  groups: Group[] = [];
  courses: Course[] = [];
  subjects: Subject[] = [];
  newGroupName: string = '';
  newSubjectName: string = '';
  selectedGroupCourseId: string = '';
  selectedSubjectCourseId: string = '';
    errorMessage: string = '';

  constructor(
    private groupService: GroupService,
    private courseService: CourseService,
    private subjectService: SubjectService
  ) {}

  ngOnInit(): void {
    this.loadGroups();
    this.loadCourses();
    this.loadSubjects();
  }

  loadGroups(): void {
    this.groupService.getGroups().subscribe({
      next: (data: Group[]) => {
        this.groups = data;
      },
      error: () => {
        this.errorMessage = 'Failed to load groups';
      }
    });
  }

  loadCourses(): void {
    this.courseService.getAllCourses().subscribe({
      next: (data: Course[]) => {
        this.courses = data;
      },
      error: () => {
        this.errorMessage = 'Failed to load courses';
      }
    });
  }

  loadSubjects(): void {
    this.subjectService.getAllSubjects().subscribe({
      next: (data: Subject[]) => {
        this.subjects = data;
      },
      error: () => {
        this.errorMessage = 'Failed to load subjects';
      }
    });
  }

  AddGroup(): void {
    if (!this.newGroupName || !this.selectedGroupCourseId) {
      this.errorMessage = 'Please enter group name and select course.';
      return;
    }

    const groupData = {
      name: this.newGroupName,
      courseId: this.selectedGroupCourseId
    };

    this.groupService.addGroup(groupData).subscribe({
      next: (newGroup: Group) => {
        this.groups.push(newGroup);
        this.newGroupName = '';
        this.selectedGroupCourseId = '';
        this.errorMessage = '';
      },
      error: () => {
        this.errorMessage = 'Failed to add group';
      }
    });
  }

  DeleteGroup(id: string): void {
    this.groupService.deleteGroup(id).subscribe({
      next: () => {
        this.groups = this.groups.filter(group => group.id !== id);
      },
      error: () => {
        this.errorMessage = 'Failed to delete group';
      }
    });
  }

  AddSubject(): void {
    if (!this.newSubjectName || !this.selectedSubjectCourseId) {
      this.errorMessage = 'Please enter subject name and select course.';
      return;
    }

    const subjectData = {
      name: this.newSubjectName,
      description: 'default description',
      courseId: this.selectedSubjectCourseId
    };

    this.subjectService.addSubject(subjectData).subscribe({
      next: (newSubject: Subject) => {
        this.subjects.push(newSubject);
        this.newSubjectName = '';
        this.errorMessage = '';
      },
      error: () => {
        this.errorMessage = 'Failed to add subject';
      }
    });
  }

  DeleteSubject(id: string): void {
    this.subjectService.deleteSubject(id).subscribe({
      next: () => {
        this.subjects = this.subjects.filter(subject => subject.id !== id);
      },
      error: () => {
        this.errorMessage = 'Failed to delete subject';
      }
    });
  }
}
