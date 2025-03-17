import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/shared/landing-page/landing-page.component';
import { LoginComponent } from './components/shared/login/login.component';
import { RegisterComponent } from './components/shared/register/register.component';

export const routes: Routes = [
    {
        path:'',
        component:LandingPageComponent,
    },
    {
        path:'login',
        component:LoginComponent,
    },
    {
        path:'register',
        component:RegisterComponent,
    },
    {
       path:'admin',
       loadChildren:() =>
        import('./pages/admin/admin/admin.module').then(
            (m) => m.AdminModule
        ),
    },
    {
        path:'student',
        loadChildren:() =>
            import('./pages/student/student/student.module').then(
                (m) => m.StudentModule
            ),
    },
    {
        path:'staff',
        loadChildren:() =>
            import('./pages/staff/staff/staff.module').then(
                (m) => m.StaffModule
            ),
    },
    {
        path:'lecturer',
        loadChildren:() =>
            import('./pages/lecturer/lecturer/lecturer.module').then(
                (m) => m.LecturerModule
            ),
    }
];
