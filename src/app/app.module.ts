import { NgModule } from '@angular/core';
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
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SharedmaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
