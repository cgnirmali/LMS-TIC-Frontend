import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BatchComponent } from '../../../components/admin/batch/batch.component';
import { AdminLayoutComponent } from '../admin-layout/admin-layout.component';
import { GroupComponent } from '../../../components/admin/group/group.component';
import { SubjectComponent } from '../../../components/admin/subject/subject.component';
import { CourseComponent } from '../../../components/admin/course/course.component';
import { StudentVerifyComponent } from '../../../components/admin/student-verify/student-verify.component';
import { StaffManagementComponent } from '../../../components/admin/staff-management/staff-management.component';
import { LecturerManagementComponent } from '../../../components/admin/lecturer-management/lecturer-management.component';
import { StudentManagementComponent } from '../../../components/admin/student-management/student-management.component';
import { ScheduleComponent } from '../../../components/admin/schedule/schedule.component';

const routes: Routes = [
  {
    path : '',
  component:AdminLayoutComponent ,
  
  children:[
   
    {
      path:'batches',
      component:BatchComponent,
    },
    {
      path:'courses',
      component:CourseComponent
    },
    {
      path:'groups',
      component:GroupComponent,
    },
    {
      path:'subjects',
      component:SubjectComponent,
    },
    {
      path:'student-verify',
      component:StudentVerifyComponent,
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
    },
    {
      path:'schedule',
      component:ScheduleComponent,
    }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
