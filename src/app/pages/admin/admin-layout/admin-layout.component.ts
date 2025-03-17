import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet,CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {
  isOpen = true;

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
