import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, Course } from 'src/app/auth/auth.service'; // AuthService for checking user data
import { CourseDetailService } from './course-detail.service';
import { addToCart } from 'src/app/store/cart.actions';
import { Store } from '@ngrx/store';
import { CartService } from '../cart-page/cart-page.service';
import { SnackbarService } from 'src/app/components/snackbar.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  course!: Course;
  currentUser: any;
  errorMessage: string = '';
  isPurchased: boolean = false;
  instructor: any;
  currentInst: any;
  userChk: Boolean = false;
  userRoleChk: any
  courseToDel: any
  subsChk: string = 'Free';
  addOrNot: boolean = false;
  reviewChk: boolean = false;
  review = {
    rating: 0,
    comment: ''
  };
  reviews: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseDetailService, 
    private authService: AuthService,   
    private router: Router,
    private store: Store,
    private cartService: CartService,
    private snackBar: SnackbarService,
  ) { }

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('id'); 
    if (courseId) {
      this.loadCourseDetails(courseId);
      this.loadReviews(courseId); 
    }

    if (this.authService.isAuthenticated()) {
      this.currentUser = this.authService.getCurrentUser();
      this.subsChk = this.currentUser.subscription;
    }
  }

  loadCourseDetails(courseId: string): void {
    this.courseService.getCourseById(courseId).subscribe(
      (data) => {
        this.course = data;
        console.log("deidjeidj", this.currentUser.role);
        
        if(this.currentUser.role != 'Instructor') {
          this.checkIfPurchased(courseId);
        }
        
        this.courseService.getInstructor(this.course.instructor_id).subscribe(
          (instructor) => {
            this.instructor = instructor;
            if(this.currentUser.role === 'Instructor') {
              if(this.currentUser.instructorId === this.instructor.instructorId){
                this.userChk = true;
                // console.log("rijullll", this.userChk);
                
              }
            }
            console.log(this.instructor);
            
          },
          (error) => {
            this.errorMessage = 'Failed to load instructor details.';
            console.error('Error:', error);
          }

        );
        console.log(this.instructor);
        
      },
      (error) => {
        this.errorMessage = 'Failed to load course details.';
        console.error('Error:', error);
      }
    );
  }

  checkIfPurchased(courseId: string): void {
    this.isPurchased = this.currentUser?.purchasedCourses.includes(courseId);
  }

  submitReview(): void {
    if (!this.review.rating || !this.review.comment) {
      this.snackBar.showError('Please provide a rating and comment.');
      return;
    }

    const courseId = this.course.course_id;
    const reviewData = {
      reviewer: this.currentUser.name,
      rating: this.review.rating,
      comment: this.review.comment
    };

    this.courseService.addReview(this.currentUser.userId, courseId, reviewData).subscribe(
      (response) => {
        this.reviews.push(response); 
        this.snackBar.showSuccess('Review submitted successfully!');
        this.review = { rating: 0, comment: '' }; 
      },
      (error) => {
        this.snackBar.showError('Failed to submit the review.');
        console.error('Error:', error);
      }
    );
  }

  loadReviews(courseId: string): void {
    this.courseService.getReviews(courseId).subscribe(
      (reviews) => {
        this.reviews = reviews;
        console.log(this.reviews);
        if (this.currentUser && this.reviews.some(review => review.User === this.currentUser.userId)) {
          this.reviewChk = true; 
        }
        
      },
      (error) => {
        console.error('Error loading reviews:', error);
      }
    );
  }


  handleEnrollButton(): void {
    if (this.isPurchased) {
      return; 
    } else {
      this.store.dispatch(addToCart({ courseId: this.course.course_id, userId: this.currentUser.userId }));
      this.snackBar.showSuccess("Item add to cart");
      this.addOrNot = true;
    }
  }

  editCourse(courseId: string) {
    this.router.navigate([`/edit-course/${courseId}`]);
  }


  openDeleteModal(instructor: any) {
    this.courseToDel = instructor;
  }

  deleteCourse(cour: any) {
    console.log("THis is ",cour);
    
    if (cour) {
      this.courseService.deleteService(cour.course_id).subscribe(() => {
        this.router.navigate([`/dashboard`]);
        // this.instructor = this.instructor.filter(inst => inst.instructorId !== instructor.id);
      }, error => {
        console.error('Error deleting instructor', error);
      });
    }
  }

  closeModal() {
    this.courseToDel = null;
  }

  MyPriceChange(CourPrice: number): Number {
    return Math.round(CourPrice * 0.7 * 100) / 100;
  }

  getRoundedReviews(reviews: number): number {
    return Math.floor(reviews); 
  }
}
