import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/auth/auth.service';
import { Observable, forkJoin } from 'rxjs';
import { DashboardService } from '../dashboard-page/dashboard.service';

@Component({
  selector: 'app-enrolled-courses',
  templateUrl: './enrolled-courses.component.html',
  styleUrls: ['./enrolled-courses.component.css']
})
export class EnrolledCoursesComponent implements OnInit {

  currentUser: any;
  enrolledCourses: Course[] = [];
  filteredCourses: Course[] = [];
  loading: boolean = true;
  error: string = '';
  searchQuery: string = '';  // For search functionality

  constructor(private dash: DashboardService, private router: Router) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData() {
    this.dash.getCurrentUserData().subscribe((data) => {
      this.currentUser = data;
      if (!this.currentUser || !this.currentUser.purchasedCourses) {
        this.router.navigate(['/login']);
        return;
      }
      this.loadEnrolledCourses(this.currentUser.purchasedCourses);
    });
  }

  loadEnrolledCourses(courseIds: string[]): void {
    if (courseIds && courseIds.length > 0) {
      const courseObservables: Observable<Course>[] = courseIds.map(courseId =>
        this.dash.getCourseById(courseId)
      );

      forkJoin(courseObservables).subscribe({
        next: (courses) => {
          this.enrolledCourses = courses;
          this.filteredCourses = [...courses];  // Initialize filteredCourses with all courses
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load enrolled course data.';
          this.loading = false;
        },
      });
    } else {
      this.loading = false;
    }
  }

  // Filter courses based on search query
  filterCourses(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredCourses = [...this.enrolledCourses];
    } else {
      this.filteredCourses = this.enrolledCourses.filter(course => 
        course.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
        course.category.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }
}
