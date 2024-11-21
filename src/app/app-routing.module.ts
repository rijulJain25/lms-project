import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ContactUsPageComponent } from './pages/contact-us-page/contact-us-page.component';
import { BlogsPageComponent } from './pages/blogs-page/blogs-page.component';
import { AllCoursesComponent } from './pages/all-courses/all-courses.component';
import { BlogDetailPageComponent } from './pages/blog-detail-page/blog-detail-page.component';
import { InstructorPageComponent } from './pages/instructor-page/instructor-page.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { AuthGuard } from './auth/auth.guard';
import { CourseDetailComponent } from './pages/course-detail/course-detail.component';
import { AddInstructorComponent } from './pages/add-instructor/add-instructor.component';
import { EditInstructorComponent } from './pages/edit-instructor/edit-instructor.component';
import { ManageStudentsComponent } from './pages/manage-students/manage-students.component';
import { EditStudentComponent } from './pages/edit-student/edit-student.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { EnrolledCoursesComponent } from './pages/enrolled-courses/enrolled-courses.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomePageComponent},
  {path: 'register', component: RegistrationPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'contactus', component: ContactUsPageComponent},
  {path: 'blogs', component: BlogsPageComponent}, 
  {path: 'allcourses', component: AllCoursesComponent}, 
  { path: 'blog/:id', component: BlogDetailPageComponent},
  {path: 'instructor', component: InstructorPageComponent}, 
  { path: 'forgot-password', component: ForgotPasswordComponent },
  {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard]},
  { path: 'course/:id', component: CourseDetailComponent, canActivate: [AuthGuard] },
  { path: 'add-instructor', component: AddInstructorComponent },
  { path: 'edit-instructor/:id', component: EditInstructorComponent },
  { path: 'manage-students', component: ManageStudentsComponent },
  { path: 'edit-student/:id', component: EditStudentComponent },
  { path: 'cart', component: CartPageComponent },
  { path: 'enrolled-courses', component: EnrolledCoursesComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
