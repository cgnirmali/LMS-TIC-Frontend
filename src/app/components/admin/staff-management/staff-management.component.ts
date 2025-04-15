import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Staff } from '../../../services/models/models';
import { StaffService } from '../../../services/staff.service';
import { Modal } from 'bootstrap';


@Component({
  selector: 'app-staff-management',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, FontAwesomeModule, HttpClientModule],
  templateUrl: './staff-management.component.html',
  styleUrl: './staff-management.component.css'
})
export class StaffManagementComponent implements OnInit {
  staffs: Staff[] = [];
  registrationForm!: FormGroup;
  selectedStaff: Staff | null = null;
  selectedStaffId: number | null = null;
  isEditMode: boolean = false; // <-- Add this property to track edit mode

  constructor(
    private fb: FormBuilder,
    private staffService: StaffService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadStaffs();
  }

  initializeForm() {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      nic: ['', Validators.required],
      userEmail: ['', [Validators.required, Validators.email]],
      utEmail: ['', this.isEditMode ? [] : [Validators.required, Validators.email]],  // Dynamically add/remove 'required' validator
      utPassword: ['', this.isEditMode ? [] : [Validators.required, Validators.minLength(6)]], // Dynamically add/remove 'required' validator
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    });
  }
  

  loadStaffs() {
    this.staffService.getAllStaffs().subscribe({
      next: (response: any) => {
        this.staffs = response.data?.$values || [];
      },
      error: (err) => {
        console.error('Error fetching staff', err);
      }
    });
  }
  register() {
    if (this.registrationForm.invalid) return;
  
    const staffData = {
      name: this.registrationForm.value.name,
      userEmail: this.registrationForm.value.userEmail,
      phoneNumber: this.registrationForm.value.phoneNumber,
      address: this.registrationForm.value.address,
      nic: this.registrationForm.value.nic,
      // Include these fields only when adding new staff
      utEmail: this.isEditMode ? null : this.registrationForm.value.utEmail,
      utPassword: this.isEditMode ? null : this.registrationForm.value.utPassword
    };
  
    if (this.isEditMode && this.selectedStaff) {
      // Update existing staff
      this.staffService.updateStaff(this.selectedStaff.id, staffData).subscribe({
        next: () => {
          this.loadStaffs();
          this.registrationForm.reset();
          this.selectedStaff = null;
          this.isEditMode = false;
          this.closeStaffModal();
        },
        error: (err) => console.error('Error updating staff', err)
      });
    } else {
      // Add new staff
      this.staffService.addStaff(staffData).subscribe({
        next: () => {
          this.loadStaffs();
          this.registrationForm.reset();
          this.closeStaffModal();
        },
        error: (err) => console.error('Error adding staff', err)
      });
    }
  }
  

  closeStaffModal() {
    const modalElement = document.getElementById('staffbackdrop');
    if (modalElement) {
      const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
      modal.hide();
    }
  }

  openDetailsModal(staff: Staff) {
    this.selectedStaff = staff;
    const modalElement = document.getElementById('detailsModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  }

  closeDetailsModal() {
    const modalElement = document.getElementById('detailsModal');
    if (modalElement) {
      const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
      modal.hide();
    }
  }

  DeleteStaff(id: number | undefined) {
    // Ensure id is defined before proceeding with deletion
    if (id === undefined) {
      console.error('Staff ID is undefined');
      return; // Exit early if ID is undefined
    }
  
    if (confirm('Are you sure you want to delete this staff member?')) {
      this.staffService.deleteStaff(id).subscribe({
        next: () => this.loadStaffs(),
        error: (err) => console.error('Error deleting staff', err)
      });
    }
  }EditStaff(id: number | undefined) {
    if (id === undefined) {
      console.error('Staff ID is undefined');
      return;
    }
  
    const staffToEdit = this.staffs.find(s => s.id === id);
    if (staffToEdit) {
      this.selectedStaff = staffToEdit;
      this.isEditMode = true; // Set edit mode to true
  
      // Initialize form with existing values
      this.registrationForm.patchValue({
        name: staffToEdit.name,
        nic: staffToEdit.nic,
        userEmail: staffToEdit.userEmail,
        address: staffToEdit.address,
        phoneNumber: staffToEdit.phoneNumber,
        utEmail: null,  // Set to null instead of empty string in edit mode
        utPassword: null // Set to null instead of empty string in edit mode
      });
  
      // Dynamically update validation based on edit mode
      this.registrationForm.get('utEmail')?.setValidators(this.isEditMode ? [] : [Validators.required, Validators.email]);
      this.registrationForm.get('utPassword')?.setValidators(this.isEditMode ? [] : [Validators.required, Validators.minLength(6)]);
  
      // Update the validity of these fields based on the new validators
      this.registrationForm.get('utEmail')?.updateValueAndValidity();
      this.registrationForm.get('utPassword')?.updateValueAndValidity();
  
      // Mark the form as pristine to avoid validation issues
      this.registrationForm.markAsPristine();
  
      // Open modal
      const modalElement = document.getElementById('staffbackdrop');
      if (modalElement) {
        const modal = new Modal(modalElement);
        modal.show();
      }
    }
  }
  
  
}  