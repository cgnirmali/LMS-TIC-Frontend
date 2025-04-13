import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from '../admin-layout/admin-layout.component';
import { StaffManagementComponent } from '../../../components/admin/staff-management/staff-management.component';
import { LecturerManagementComponent } from '../../../components/admin/lecturer-management/lecturer-management.component';
import { StudentManagementComponent } from '../../../components/admin/student-management/student-management.component';
import { BatchCourseComponent } from '../../../components/admin/batch-course/batch-course.component';
import { GroupSubjectComponent } from '../../../components/admin/group-subject/group-subject.component';

const routes: Routes = [
  {
    path : '',
  component:AdminLayoutComponent ,
  
  children:[
    
    {
      path:'manage-batch&course',
      component:BatchCourseComponent,
    },
    {
      path:'manage-group&subject',
      component:GroupSubjectComponent,
    },
    {
      path:'staff-management',
      component:StaffManagementComponent,
    },
    {
      path:'lecturer-management',
      component:LecturerManagementComponent,
    },
    {
      path:'student-management',
      component:StudentManagementComponent,
    }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
