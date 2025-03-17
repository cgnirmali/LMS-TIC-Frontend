import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterModule, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  step: number = 1;
  emailForm: FormGroup;
  otpForm: FormGroup;
  registrationForm: FormGroup;
  verifiedEmail: string = '';  // Store the verified email

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });

    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      gender: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      nic: ['', [Validators.required, Validators.pattern('^[0-9]{9}[VvXx]?$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      address: ['', Validators.required],
      utNumber: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]]
    });
    
  }

  ngOnInit(): void {
    console.log(this.registrationForm.invalid);
    console.log(this.registrationForm.value);

    // Check if email exists in local storage
    const email = localStorage.getItem('verifiedEmail');
    if (email) {
      this.verifiedEmail = email;
    }
  }

  sendOtp() {
    if (this.emailForm.valid) {
      const email = this.emailForm.value.email;
      const url = `https://localhost:7265/api/User/send?email=${encodeURIComponent(email)}`;

      this.http.post(url, {}).subscribe(
        (response: any) => {
          console.log('OTP Sent:', response);
          this.step = 2;
        },
        (error) => {
          console.error('Error sending OTP:', error);
          alert(`Failed to send OTP. ${error.error?.message || 'Please try again.'}`);
        }
      );
    }
  }

  verifyOtp() {
    if (this.otpForm.valid) {
      const email = this.emailForm.value.email;
      const otp = this.otpForm.value.otp;
      const payload = { email: email, otp: otp };

      this.http.post('https://localhost:7265/api/User/VerifyOtp', payload).subscribe(
        (response: any) => {
          console.log('OTP Verified:', response);
          // Save the email in localStorage
          localStorage.setItem('verifiedEmail', email);
          this.verifiedEmail = email; // Optionally store it in a variable as well
          this.step = 3; // Move to Step 3 (Registration)
        },
        (error) => {
          console.error('Error verifying OTP:', error);
          alert(`Failed to verify OTP. ${error.error?.message || 'Please try again.'}`);
        }
      );
    }
  }

  register() {
    if (this.registrationForm.valid) {
      // Retrieve the email from localStorage
      const email = localStorage.getItem('verifiedEmail');

      // Ensure the email is available
      if (email) {
        // Update the registration form with the verified email
        this.registrationForm.patchValue({ email: email });
      } else {
        alert('Email is not verified. Please verify your email first.');
        return;
      }

      console.log('Registration Form Value:', this.registrationForm.value);

      const registrationData = this.registrationForm.value;
      this.http.post('https://localhost:7265/api/Student/register-new-student', registrationData).subscribe(
        (response: any) => {
          console.log('Student Registered:', response);
          alert('Registration Successful!');
          this.step = 1;
          this.emailForm.reset();
          this.otpForm.reset();
          this.registrationForm.reset();
          localStorage.removeItem('verifiedEmail'); // Clear the email from localStorage after registration
        },
        (error) => {
          console.error('Error registering student:', error);
          
        }
      );
    }
  }
}
