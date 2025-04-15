import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

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
  emaildata : string = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });

    this.registrationForm = this.fb.group({   
      updatepassword: ['', [Validators.required]]
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
      const url = `https://localhost:7265/api/User/send?email=${email}`;

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
      this.emaildata = email
      const otp = this.otpForm.value.otp;
      const payload = { email: email, otp: otp };

      this.http.post('https://localhost:7265/api/User/CheckOTP', payload).subscribe(
        (response: any) => {
          alert("DUUU")
          console.log('OTP Verified:', response);
        
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





  register(){

    if (this.registrationForm.valid) {
 
    const updatepasswordUrl = 'https://localhost:7265/api/User/ChangePassword';
    const email = this.emailForm.value.email;

    console.log( email)
    const newpassword = this.registrationForm.value.updatepassword;
    console.log(newpassword, email)

    this.http.post<any>(`${updatepasswordUrl}?email=${email}&password=${newpassword}` , null) 
      .subscribe({
        next: (response) => {
          console.log("Password updated successfully:", response);
          alert("sucessfully update now login ")
          this.router.navigate(['/login']);
                
        
        },
        error: (err) => {
          console.error('HTTP Error:', err);
          
          
        }
      });
  }

}
  

}
  

