import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { OtpService } from '../../../services/otp.service';


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

  
  
 

  constructor(private http: HttpClient, private router: Router , private otpService: OtpService ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });


    this.otpService.removeExpiredOtps().subscribe({
      next: (response) => {
        console.log('Response:', response);
        // Handle success (e.g., display a success message)
      },
      error: (error) => {
        console.error('Error:', error);
        // Handle error (e.g., display an error message)
      }
    });
  }





  onSubmit(): void {
  
  
    this.isLoading = true;
    this.errorMessage = undefined;
  
    const loginUrl = 'https://localhost:7265/api/User/Login';
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
  
    this.http.get<any>(`${loginUrl}?email=${email}&password=${password}`)
      .subscribe({
        next: (response) => {
          console.log("Login API response:", response);
  
          // check response validity
          if (response && response.status === 'success' && response.token?.token) {
            localStorage.setItem('token', response.token.token);
  
            try {
              const userDetails: any = jwtDecode(response.token.token);
              console.log('Decoded Token Details:', userDetails);
              console.log('Decoded Token Details:', userDetails.Role);
  
             
              if (userDetails.Role === 'Admin') {
                localStorage.setItem('AdminUserID', userDetails.Id);
                localStorage.setItem('Role1', userDetails.Role);
                this.router.navigate(['/admin']);
              } else if ((userDetails.Role =="Staff")) {
                console.log('Decoded Token Details:', userDetails.Role);
  
                localStorage.setItem('StaffUserId', userDetails.Id);
                localStorage.setItem('Role2', userDetails.Role);
                this.router.navigate(['/staff']);
                
              }else if  ((userDetails.Role === 'Student')) {
                localStorage.setItem('StudentUserId', userDetails.Id);
                localStorage.setItem('Role3', userDetails.Role);
                this.router.navigate(['/student']);
                
              }else if (userDetails.Role === 'lectures') {
                localStorage.setItem('lecturesUserId', userDetails.Id);
                localStorage.setItem('Role4', userDetails.Role);
                this.router.navigate(['/em-sidebar']);
                
              }
            } catch (decodeError) {
              console.error('Token decode error:', decodeError);
           
            }
          } else {
            this.errorMessage = 'Login failed. Invalid credentials.';
           
          }
  
          this.isLoading = false;
        },
        error: (err) => {
          console.error('HTTP Error:', err);
          // ✅ avoid accessing undefined properties
          const msg = err?.error?.message || 'Something went wrong!';
          this.errorMessage = msg;
        
          this.isLoading = false;
        }
      });
  }
  
}




