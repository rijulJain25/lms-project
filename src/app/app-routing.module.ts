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
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { InstructorCoursesComponent } from './pages/instructor-courses/instructor-courses.component';
import { AddCoursesComponent } from './pages/add-courses/add-courses.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SubscriptionComponent } from './pages/subscription/subscription.component';
import { PopularCoursesComponent } from './pages/popular-courses/popular-courses.component';
import { AdminGuardGuard } from './auth/admin-guard.guard';
import { InstructorGuardGuard } from './auth/instructor-guard.guard';
import { SetNewPasswordComponent } from './pages/set-new-password/set-new-password.component';

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
  { path: 'course/:id', component: CourseDetailComponent, canActivate: [AuthGuard]},
  { path: 'add-instructor', component: AddInstructorComponent, canActivate: [AdminGuardGuard]},
  { path: 'edit-instructor/:id', component: EditInstructorComponent, canActivate: [AdminGuardGuard]},
  { path: 'manage-students', component: ManageStudentsComponent, canActivate: [AdminGuardGuard] },
  { path: 'edit-student/:id', component: EditStudentComponent, canActivate: [AdminGuardGuard] },
  { path: 'cart', component: CartPageComponent, canActivate: [AuthGuard] },
  { path: 'enrolled-courses', component: EnrolledCoursesComponent, canActivate: [AuthGuard] },
  { path: 'edit-course/:id', component: EditCourseComponent, canActivate: [InstructorGuardGuard] },
  { path: 'created-courses', component: InstructorCoursesComponent, canActivate: [InstructorGuardGuard] },
  { path: 'add-course', component: AddCoursesComponent, canActivate: [InstructorGuardGuard] },
  { path: 'subscription', component: SubscriptionComponent, canActivate: [AuthGuard] },
  { path: 'popular-course', component: PopularCoursesComponent },
  { path: 'set-new-password', component: SetNewPasswordComponent },

  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

