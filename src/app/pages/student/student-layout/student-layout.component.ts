import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-student-layout',
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './student-layout.component.html',
  styleUrl: './student-layout.component.css',
})
export class StudentLayoutComponent {
  isOpen = true;
  // studentid: any | string;
  userId: string = ''; // User ID will be fetched from localStorage
  date = '';

  imageUrl: any;

  toggleSidebar() {
    this.isOpen = !this.isOpen; // Toggle sidebar visibility
  }

  constructor(private router: Router) {}

  ngOnInit(): void {}

  toggleCollapse() {
    throw new Error('Method not implemented.');
  }

  getStudentInfo(studentid: string) {}

  logout() {
    // Clear local storage
    localStorage.clear();

    // Redirect to the home page
    this.router.navigate(['/']);
  }
}
