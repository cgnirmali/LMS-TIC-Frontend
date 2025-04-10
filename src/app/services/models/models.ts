// src/app/models/student.model.ts

export interface Student {
    id: string;
    userId: string;
    firstName: string;
    lastName: string;
    userEmail: string;
    phoneNumber: string;
    createdDate: string;
    class: { id: string; className: string } | string | number;  // Adjust class as per your structure
    nic: string;
    utNumber: string;
    gender: string;
    adminVerify: boolean;
    address: string;
    status: number;
    user: any;  // Adjust according to your user model
    utEmail?: string; // <-- Add this if it's an optional property
    utPassword?: string; // <-- You can optionally add the password if needed
}


export interface User {
    id: string;
    createdDate: string;
    utEmail: string;
    password: string;
    role: number;
    otp: any;
}


  export interface BatchApiResponse {
    $id: string;
    $values: Batch[];
  }
  
  export interface Batch {
    $id: string;
    id: string;
    createdDate: string; // You can change to Date if you later convert/parse it
    name: string;
  }
  

  export interface CourseApiResponse {
    $id: string;
    $values: Course[];
  }
  
  export interface Course {
    $id: string;
    id: string;
    createdDate: string;
    name: string;
    batchId: string;
    batch: Batch;
  }
  
