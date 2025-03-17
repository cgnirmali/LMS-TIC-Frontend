import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LecturerLayoutComponent } from '../lecturer-layout/lecturer-layout.component';
import { AssesmentComponent } from '../../../components/lecturer/assesment/assesment.component';
import { QuizExamComponent } from '../../../components/lecturer/quiz-exam/quiz-exam.component';

const routes: Routes = [
  {
    path:'',
    component:LecturerLayoutComponent,
     children:[
       
        {
          path:'assesment',
          component:AssesmentComponent,
        },
        {
          path:'quiz-exam',
          component:QuizExamComponent
        },
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LecturerRoutingModule { }
