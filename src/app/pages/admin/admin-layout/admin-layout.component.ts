import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent  {
toggleCollapse() {
throw new Error('Method not implemented.');
}
  isOpen = true;
imageUrl: any;

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  constructor
  (
    private router:Router
  ) {}


  logout() {
    // Clear local storage
    localStorage.clear();

    // Redirect to the home page
    this.router.navigate(['/']);
  }
}
