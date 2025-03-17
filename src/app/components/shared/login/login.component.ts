import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  errorMessage: string | undefined;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = undefined; // Clear any previous error messages

    const loginData = this.loginForm.value;

    this.http.post<any>('https://localhost:7265/api/Auth/login', loginData).subscribe(
      response => {
        this.isLoading = false;
        localStorage.setItem('token', response.token.token);
        localStorage.setItem('userRole', response.user.role.toString());

        if (response.user.role === 1) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      error => {
        this.isLoading = false;
        this.errorMessage = 'Login failed. Please check your credentials and try again.';
      }
    );
  }
}
