import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-staff-management',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, FontAwesomeModule, HttpClientModule],
  templateUrl: './staff-management.component.html',
  styleUrl: './staff-management.component.css'
})
export class StaffManagementComponent implements OnInit {
  EditStaff(arg0: any) {
  throw new Error('Method not implemented.');
  }
  DeleteStaff(arg0: any) {
  throw new Error('Method not implemented.');
  }
    step: number = 1; // Controls step navigation
    emailForm: FormGroup;
    otpForm: FormGroup;
    registrationForm: FormGroup;
  gender: any;
  staffs: any;
  
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
        utNumber: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        ConfirmPassword: ['', Validators.required],
        address: ['', Validators.required],
     
      } ,
      
    
    );
    }
  
    ngOnInit(): void {
    
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