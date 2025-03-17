import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;  // Non-null assertion operator
  isLoading = false; // Initialize loading state
  errorMessage: string | undefined;

  ngOnInit(): void {
    // Initialize the form group with controls for email and password
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),  // Add validators for email
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),  // Add password validation
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;  // If form is invalid, prevent submission
    }

    this.isLoading = true;  // Set isLoading to true when form is submitted

    // Simulate a login request (replace with actual logic)
    setTimeout(() => {
      // Here, you would make your login API request and handle success/failure
      const success = true; // For example, login is successful.

      if (success) {
        // If successful, handle success (e.g., navigate to another page, show a success message)
        this.isLoading = false;  // Set isLoading back to false
        // this.toastr.success('Logged in successfully!');
      } else {
        // If login fails, handle failure (e.g., show error message)
        this.isLoading = false;  // Set isLoading back to false
        this.errorMessage = 'Login failed. Please check your credentials and try again.';
        // this.toastr.error('Login failed');
      }
    }, 2000);  // Simulating a delay of 2 seconds (replace with actual API call delay)
  }
}
