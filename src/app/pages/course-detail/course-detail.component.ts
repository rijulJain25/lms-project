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
    }

    if (this.authService.isAuthenticated()) {
      this.currentUser = this.authService.getCurrentUser();
    }
  }

  loadCourseDetails(courseId: string): void {
    this.courseService.getCourseById(courseId).subscribe(
      (data) => {
        this.course = data;
        this.checkIfPurchased(courseId);
        
        this.courseService.getInstructor(this.course.instructor_id).subscribe(
          (instructor) => {
            this.instructor = instructor;
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

  handleEnrollButton(): void {
    if (this.isPurchased) {
      return; 
    } else {
      this.store.dispatch(addToCart({ courseId: this.course.course_id, userId: this.currentUser.userId }));
      this.snackBar.showSuccess("Item add to cart")
    }
  }
}
