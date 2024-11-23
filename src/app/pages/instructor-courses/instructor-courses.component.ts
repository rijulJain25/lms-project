import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard-page/dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instructor-courses',
  templateUrl: './instructor-courses.component.html',
  styleUrls: ['./instructor-courses.component.css']
})
export class InstructorCoursesComponent implements OnInit {
  instCourses: any = [];
  instructorCourses: any = [];
  currentInst: any;
  filterInstCourses: any;
  searchItem: string = '';

  constructor(private dash: DashboardService, private router: Router) { }

  ngOnInit(): void {
    this.dash.getCurrentUserData().subscribe(data => {
      this.currentInst = data;
      console.log("dataaa", this.currentInst);
      if (!this.currentInst || !this.currentInst.role) {
        this.router.navigate(['/login']); 
        return;
      }
      this.loadInstructorCourses(); 
    });
  }

  loadInstructorCourses(): void {
    this.dash.getCourses().subscribe(courses => {
      this.instCourses = courses;
      this.instructorCourses = this.instCourses.filter((course: { instructor_id: any }) =>
        course.instructor_id === this.currentInst.instructorId);
      this.filterInstCourses = [...this.instructorCourses]; 
      // console.log('Instructor Courses:', this.instructorCourses);
      // console.log('FIlter Courses:', this.filterInstCourses);
      this.filterOnSearch(); 
    });
  }

  filterOnSearch(): void {
    if (this.searchItem) {
      this.filterInstCourses = this.instructorCourses.filter((course: { name: string, category: string }) => {
        return course.name.toLowerCase().includes(this.searchItem.toLowerCase()) ||
               course.category.toLowerCase().includes(this.searchItem.toLowerCase());
      });
    } else {
      this.filterInstCourses = [...this.instructorCourses];
    }
  }

  goToAddCoursePage(): void {
    this.router.navigate(['/add-course']);
  }
}
