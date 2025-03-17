import { CommonModule } from '@angular/common';
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
  step: number = 1; // Controls step navigation
  emailForm: FormGroup;
  otpForm: FormGroup;
  registrationForm: FormGroup;
gender: any;

  constructor(private fb: FormBuilder) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });

    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      gender: ['',Validators.required],
      phonenumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], 
      nic: ['', [Validators.required, Validators.pattern('^[0-9]{9}[VvXx]?$')]], 
     
      password: ['', [Validators.required, Validators.minLength(6)]],
      ConfirmPassword: ['', Validators.required],
      address: ['', Validators.required],
   
    } ,
    
  
  );
  }

  ngOnInit(): void {
    // Initialize the form with 'gender' control having an empty string as the default value
    this.registrationForm = this.fb.group({
      gender: ['', Validators.required], // Empty string sets the placeholder to visible initially
      // other form controls...
    });
  }
  
  // Simulate sending OTP and move to Step 2
  sendOtp() {
    if (this.emailForm.valid) {
      console.log('OTP sent to:', this.emailForm.value.email);
      this.step = 2;
    }
    this.registrationForm = this.fb.group({
      gender: ['', Validators.required]  // Set default value to empty string
    });
  }

  // Simulate OTP verification and move to Step 3
  verifyOtp() {
    if (this.otpForm.valid) {
      console.log('OTP Verified:', this.otpForm.value.otp);
      this.step = 3;
    }
  }

  // Simulate user registration
  register() {
    if (this.registrationForm.valid) {
      console.log('User Registered:', this.registrationForm.value);
      alert('Registration Successful!');
      this.step = 1; // Reset to Step 1 after successful registration
      this.emailForm.reset();
      this.otpForm.reset();
      this.registrationForm.reset();
    }
  }
}