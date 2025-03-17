import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, HttpClientModule],

  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent  {
  images: string[] = [
    '/landingpage/Screenshot 2025-03-14 095215.png',
    '/landingpage/Screenshot 2025-03-14 095921.png',
    '/landingpage/Screenshot 2025-03-14 095109.png',
  ];
  currentIndex: number = 0;

  constructor() {
    setInterval(() => {
      this.nextImage();
    }, 3000);
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }
}
