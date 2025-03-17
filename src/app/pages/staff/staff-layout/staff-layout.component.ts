import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-staff-layout',
  imports: [CommonModule ,RouterModule],
  templateUrl: './staff-layout.component.html',
  styleUrl: './staff-layout.component.css'
})
export class StaffLayoutComponent{
  isOpen = true;

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

}
