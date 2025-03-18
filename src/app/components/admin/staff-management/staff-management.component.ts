import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
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
  staffs: any[] = [];
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      gender: ['', Validators.required],
      phonenumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      nic: ['', [Validators.required, Validators.pattern('^[0-9]{9}[VvXx]?$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      ConfirmPassword: ['', Validators.required],
      address: ['', Validators.required],
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.loadStaffs();
  }

  loadStaffs() {
    this.http.get('https://localhost:7265/api/Staff/Get_All_Staff').subscribe(
      (response: any) => {
        if (response.status === 'success') {
          this.staffs = response.data;
        } else {
          console.error('Failed to fetch staff data');
        }
      },
      (error) => {
        console.error('API error:', error);
      }
    );
  }

  EditStaff(id: string) {
    this.http.get(`https://localhost:7265/api/Staff/Get_Staff/${id}`).subscribe(
      (response: any) => {
        if (response.status === 'success') {
          const staff = response.data;
          this.registrationForm.patchValue({
            firstName: staff.firstName,
            lastName: staff.lastName,
            gender: staff.gender,
            phonenumber: staff.phoneNumber,
            nic: staff.nic,
            password: '', // You might want to leave password empty for security
            ConfirmPassword: '', // Same for confirm password
            address: staff.address
          });
        } else {
          console.error('Failed to fetch staff details');
        }
      },
      (error) => {
        console.error('API error:', error);
      }
    );
  }

  DeleteStaff(id: string) {
    if (confirm('Are you sure you want to delete this staff?')) {
      this.http.delete(`https://localhost:7265/api/Staff/Delete_Staff/${id}`).subscribe(
        (response: any) => {
          alert('Staff deleted successfully!');
          this.loadStaffs(); // Refresh the list
        },
        (error) => {
          console.error('Error deleting staff:', error);
        }
      );
    }
  }

  register() {
    if (this.registrationForm.valid) {
      console.log('User Registered:', this.registrationForm.value);
      alert('Registration Successful!');
      this.registrationForm.reset();
      this.loadStaffs(); // Reload staff list after registration
    }
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('ConfirmPassword')?.value ? null : { mismatch: true };
  }
}
