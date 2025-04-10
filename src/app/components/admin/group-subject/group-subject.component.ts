import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import {  BatchService } from '../../../services/batch.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-group-subject',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './group-subject.component.html',
  styleUrl: './group-subject.component.css'
})
export class GroupSubjectComponent implements OnInit {
  AddGroup() {
    throw new Error('Method not implemented.');
  }
  DeleteGroup(arg0: any) {
    throw new Error('Method not implemented.');
  }
  AddSubject() {
    throw new Error('Method not implemented.');
  }
  DeleteSubject(arg0: any) {
    throw new Error('Method not implemented.');
  }

  batchForm: FormGroup;
  errorMessage: string = '';
  isModalOpen: boolean = false;
  
  newGroupName: any;
  groups: any;
  newSubjectName: any;
  subjects: any;
  
  constructor(private fb: FormBuilder, private batchService: BatchService) {
    this.batchForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  ngOnInit(): void {
    this.loadBatches();
  }

  loadBatches(): void {
    // this.batchService.getBatches().subscribe(
    //   (data: Batch[]) => this.batches = data,
    //   (error: Error) => this.errorMessage = 'Failed to load batches'
    // );
  }

  openModal(): void {
    this.isModalOpen = true;
    this.errorMessage = '';
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.batchForm.reset();
  }

  addBatch(): void {
    // if (this.batchForm.valid) {
    //   this.batchService.addBatch(this.batchForm.value).subscribe(
    //     (response: Batch) => {
    //       this.batches.push(response);
    //       this.batchForm.reset();
    //       this.closeModal();
    //     },
    //     (error: Error) => {
    //       this.errorMessage = 'Failed to add batch';
    //     }
    //   );
    // }
  }

  approveBatch(id: number): void {
    // this.batchService.approveBatch(id).subscribe(
    //   () => {
    //     this.loadBatches();
    //   },
    //   (error: Error) => {
    //     this.errorMessage = 'Failed to approve batch';
    //   }
    // );
  }

  rejectBatch(id: number): void {
    // this.batchService.rejectBatch(id).subscribe(
    //   () => {
    //     this.loadBatches();
    //   },
    //   (error: Error) => {
    //     this.errorMessage = 'Failed to reject batch';
    //   }
    // );
  }
}
