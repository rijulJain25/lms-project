import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ContactUsPageComponent } from './pages/contact-us-page/contact-us-page.component';
import { HomeHeadComponent } from './components/home-head/home-head.component';
import { HomeStatsComponent } from './components/home-stats/home-stats.component';
import { HomeTrendingCourseComponent } from './components/home-trending-course/home-trending-course.component';
import { HomeMasteringComponent } from './components/home-mastering/home-mastering.component';
import { SmallCardComponent } from './components/small-card/small-card.component';
import { CarouselCardComponent } from './components/carousel-card/carousel-card.component';
import { HomeInstructorComponent } from './components/home-instructor/home-instructor.component';
import { HomeVideoComponent } from './components/home-video/home-video.component';
import { SafeUrlPipe } from './safe-url.pipe';
import { HomeBrandsComponent } from './components/home-brands/home-brands.component';
import { HomeTestimonialComponent } from './components/home-testimonial/home-testimonial.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { BlogsPageComponent } from './pages/blogs-page/blogs-page.component';
import { HttpClientModule } from '@angular/common/http';
import { AllCoursesComponent } from './pages/all-courses/all-courses.component';
import { SharedmaterialModule } from './sharedmaterial/sharedmaterial.module';
import { RecentPostsComponent } from './components/recent-posts/recent-posts.component';
import { BlogDetailPageComponent } from './pages/blog-detail-page/blog-detail-page.component';
import { InstructorPageComponent } from './pages/instructor-page/instructor-page.component';
import { InstCardComponent } from './components/inst-card/inst-card.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { TrendingDashboardComponent } from './components/trending-dashboard/trending-dashboard.component';
import { StudentRegistrationComponent } from './components/student-registration/student-registration.component';
import { IntructorRegistrationComponent } from './components/intructor-registration/intructor-registration.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { roleReducer } from './store/role.reducer';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomePageComponent,
    ContactUsPageComponent,
    HomeHeadComponent,
    HomeStatsComponent,
    HomeTrendingCourseComponent,
    HomeMasteringComponent,
    SmallCardComponent,
    CarouselCardComponent,
    HomeInstructorComponent,
    HomeVideoComponent,
    SafeUrlPipe,
    HomeBrandsComponent,
    HomeTestimonialComponent,
    RegistrationPageComponent,
    LoginPageComponent,
    BlogsPageComponent,
    AllCoursesComponent,
    RecentPostsComponent,
    BlogDetailPageComponent,
    InstructorPageComponent,
    InstCardComponent,
    ForgotPasswordComponent,
    DashboardPageComponent,
    TrendingDashboardComponent,
    StudentRegistrationComponent,
    IntructorRegistrationComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SharedmaterialModule,
    StoreModule.forRoot({ role: roleReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
