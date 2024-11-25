import { Component, Input, OnInit } from '@angular/core';
import { Instructor } from '../intructor-registration/intructor-registration.component';
import { CarouselService } from './carousel.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carousel-card',
  templateUrl: './carousel-card.component.html',
  styleUrls: ['./carousel-card.component.css']
})
export class CarouselCardComponent implements OnInit {

  errorMessage: string = '';
  subsChk: string = 'Free';
  constructor(private router: Router, private carouselService: CarouselService, private authService: AuthService) { }

  instructorData: Instructor = {
    name: '',
    email: '',
    bio: '',
    reviewIns: 0,
    image: '',
    specialization: '',
    experience: '',
    socialLinks: {
      linkedin: '',
      twitter: ''
    },
    location: '',
    username: '',
    password: '',
    isFirstLogin: false,
    ownRegistered: true,
  };

  @Input() course: any;
  currentUser: any; 

  ngOnInit(): void {
    // console.log("my data", this.course);
    this.loadInstructorData();
    // console.log("mymyyy",this.course.reviews.length)
    if (this.authService.isAuthenticated()) {
      this.currentUser = this.authService.getCurrentUser();
      console.log(this.currentUser);
      
      this.subsChk = this.currentUser.subscription; 
      console.log(this.subsChk);
      
    }
  }

  onCourseButtonClick(): void {
    this.router.navigate([`/course/${this.course.course_id}`]);
  }

  hasPurchased(courseId: number): boolean {
    return this.currentUser?.purchasedCourses.includes(courseId.toString());
  }


  loadInstructorData(){
    this.carouselService.GetInstructors(this.course.instructor_id).subscribe((inst) => {
      // console.log("Instructor yaha hai", inst);
      
      this.instructorData.name = inst.name;
      this.instructorData.image = inst.image;
    }, (error) =>{
      this.showErrorMessage('Failed to load instructor data.');
      console.error('Error:', error);
    }
  )
  }  

  calculateAverageRating(reviews: { rating: number }[]): number {
    if (reviews.length === 0) {
      return 0;
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  }

  showErrorMessage(message: string) {
    this.errorMessage = message;
  }

}


