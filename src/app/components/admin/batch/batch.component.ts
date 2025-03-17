import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BatchService } from '../../../services/batch.service';

@Component({
  selector: 'app-batch',
  imports: [RouterLink,CommonModule,ReactiveFormsModule],
  templateUrl: './batch.component.html',
  styleUrl: './batch.component.css'
})
export class BatchComponent {
  batchForm: FormGroup;
  batches: { id: number; name: string }[] = [];
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private batchService: BatchService) {
    this.batchForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  ngOnInit(): void {
    this.loadBatches();
  }

  // Load batches from the backend
  loadBatches(): void {
    this.batchService.getBatches().subscribe({
      next: (data) => (this.batches = data),
      error: (err) => console.error('Failed to fetch batches:', err),
    });
  }

  // Add a new batch dynamically
  addBatch(): void {
    if (this.batchForm.valid) {
      const batchName = this.batchForm.value.name;
  
      this.batchService.addBatch(batchName).subscribe({
        next: (newBatch) => {
          // Clear any previous error
          this.errorMessage = null;
  
          // Add the new batch to the local array
          this.batches.push(newBatch);
          this.batchForm.reset(); // Clear the form
        },
        error: (err) => {
          console.error('Failed to add batch:', err);
  
          // Set the error message if the batch already exists
          if (err.status === 409) { // Assuming 409 Conflict for duplicate
            this.errorMessage = 'Batch already exists!';
          } else {
            this.errorMessage = 'Failed to add batch. Please try again.';
          }
        },
      });
    }
  }
  

  // Delete a batch dynamically
  deleteBatch(id: number): void {
    // Optimistically remove the batch from the frontend
    const index = this.batches.findIndex((batch) => batch.id === id);
    if (index > -1) {
      this.batches.splice(index, 1); // Remove the batch from the local array
    }

    // Call the backend to delete the batch
    this.batchService.deleteBatch(id).subscribe({
      next: () => {
        console.log(`Batch with id ${id} deleted successfully.`);
      },
      error: (err) => {
        console.error('Failed to delete batch:', err);

        // Revert the deletion in the frontend if backend deletion fails
        this.loadBatches(); // Optionally reload batches
      },
    });
  }
}
