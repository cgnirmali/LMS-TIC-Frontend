import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BatchService, Batch } from '../../../services/batch.service';

@Component({
  selector: 'app-batch',
  imports: [RouterLink,CommonModule,ReactiveFormsModule],
  templateUrl: './batch.component.html',
  styleUrl: './batch.component.css'
})
export class BatchComponent implements OnInit{
  batchForm: FormGroup;
  batches: Batch[] =[];
  errorMessage: string = '';
  isModalOpen: boolean = false;

  constructor(private fb: FormBuilder, private batchService: BatchService) {
    this.batchForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  ngOnInit(): void {
    this.loadBatches();
  }

  loadBatches(): void {
    this.batchService.getBatches().subscribe(
      (data: Batch[]) => this.batches = data,
      (error: Error) => this.errorMessage = 'Failed to load batches'
    );
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
    if (this.batchForm.valid) {
      this.batchService.addBatch(this.batchForm.value).subscribe(
        (response: Batch) => {
          this.batches.push(response);
          this.batchForm.reset();
          this.closeModal();
        },
        (error: Error) => {
          this.errorMessage = 'Failed to add batch';
        }
      );
    }
  }

  approveBatch(id: number): void {
    this.batchService.approveBatch(id).subscribe(
      () => {
        // Update batch status or reload
        this.loadBatches();
      },
      (error: Error) => {
        this.errorMessage = 'Failed to approve batch';
      }
    );
  }

  rejectBatch(id: number): void {
    this.batchService.rejectBatch(id).subscribe(
      () => {
        // Update batch status or reload
        this.loadBatches();
      },
      (error: Error) => {
        this.errorMessage = 'Failed to reject batch';
      }
    );
  }
}