import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-lecturer-layout',
  imports: [RouterModule,CommonModule],
  templateUrl: './lecturer-layout.component.html',
  styleUrl: './lecturer-layout.component.css'
})
export class LecturerLayoutComponent  {
  isOpen = true;
  userName: string = '';
  userId: string='';



  constructor(
    private router:Router
  ) {

  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('UserId') || ''; // Get the logged-in user's ID from localStorage
    console.log('userId from localStorage:', this.userId);
    if (this.userId) {
      this.getTeacherInfo(this.userId);  // Fetch student data using studentid
    }
  }

  getTeacherInfo(teacherid: string) {
    
  }

  logout() {
    // Clear local storage
    localStorage.clear();

    // Redirect to the home page
    this.router.navigate(['/']);
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;  // Toggle sidebar visibility
  }


}
