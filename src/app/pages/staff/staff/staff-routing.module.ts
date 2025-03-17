import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffLayoutComponent } from '../staff-layout/staff-layout.component';
import { MaterialsComponent } from '../../../components/staff/materials/materials.component';
import { AttendanceComponent } from '../../../components/staff/attendance/attendance.component';

const routes: Routes = [
  
  {
    path:'',
    component:StaffLayoutComponent,
     children:[
       
        {
          path:'materials',
          component:MaterialsComponent,
        },
        {
          path:'attendance',
          component:AttendanceComponent
        },
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
