import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentDashboardComponent } from '../../../components/student/student-dashboard/student-dashboard.component';
import { StudentLayoutComponent } from '../student-layout/student-layout.component';
import { SettingsComponent } from '../../../components/student/settings/settings.component';
import { AssesmentSubmissionComponent } from '../../../components/student/assesment-submission/assesment-submission.component';

const routes: Routes = [
  {
    path:'',
  component:StudentLayoutComponent,
  canActivate:[],
  children:[
    {
      path: 'student_dashboard',
      component: StudentDashboardComponent,
    },
    {
      path: 'settings',
      component: SettingsComponent,
      children: [
        
      ],
    },
    {
      path:'assesment-submission',
      component:AssesmentSubmissionComponent,
    } 
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
