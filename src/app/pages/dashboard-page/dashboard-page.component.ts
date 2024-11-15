import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from './dashboard.service';
import { Course } from 'src/app/auth/auth.service';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {

  currentUser: any;
  role: string = ''; 
  courses: any[] = []; 
  userCourses: any[] = []; 
  purchasedCourses: Course[] = [];
  loading: boolean = true;
  error: string = '';
  recommendedCourses: Course[] = [];

  // Trending Courses Data
  trendingCourses = [
    {
      name: 'Angular for Beginners',
      category: 'Web Development',
      level: 'Beginner',
      duration: 8,
      image: 'assets/images/angular.png'
    },
    {
      name: 'Mastering Python',
      category: 'Programming',
      level: 'Intermediate',
      duration: 12,
      image: 'assets/images/angular.png'
    },
    {
      name: 'Data Science with R',
      category: 'Data Science',
      level: 'Advanced',
      duration: 15,
      image: 'assets/images/angular.png'
    },
    {
      name: 'Advanced JavaScript',
      category: 'Web Development',
      level: 'Advanced',
      duration: 10,
      image: 'assets/images/angular.png'
    }
  ];

  constructor(private dash: DashboardService, private router: Router) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData() {
    this.currentUser = this.dash.getCurrentUser();
    if (!this.currentUser || !this.currentUser.role) {
      this.router.navigate(['/login']); 
      return;
    }

    this.role = this.currentUser.role;
    this.loadCourses(this.currentUser.purchasedCourses);
    this.loadRecommendedCourses(this.currentUser.interests);
  }

  loadCourses(courseIds: string[]): void {
    if (courseIds && courseIds.length > 0) {
      const courseObservables: Observable<Course>[] = courseIds.map(courseId =>
        this.dash.getCourseById(courseId)
      );

      forkJoin(courseObservables).subscribe({
        next: (courses) => {
          this.purchasedCourses = courses;
          console.log("Purchased Courses: ", this.purchasedCourses);
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load course data.';
          this.loading = false;
        },
      });
    } else {
      this.loading = false;
    }
  }

  loadRecommendedCourses(interests: string[]): void {
    if (interests && interests.length > 0) {
      const courseObservables: Observable<any>[] = interests.map(interest => 
        this.dash.getCoursesByCategory(interest)  
      );

      forkJoin(courseObservables).subscribe({
        next: (coursesArrays: any[]) => {  
          this.recommendedCourses = [].concat(...coursesArrays);
          console.log("Recommended Courses: ", this.recommendedCourses);
        },
        error: (err) => {
          this.error = 'Failed to load recommended courses.';
        }
      });
    }
  }
}
