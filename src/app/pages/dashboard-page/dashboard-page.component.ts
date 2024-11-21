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
  allCourses: any;
  courses: any[] = []; 
  currentInst: any;
  student: any;
  instructorAll : any;
  instCourses: any[] = []; 
  purchasedCourses: Course[] = [];
  loading: boolean = true;
  error: string = '';
  recommendedCourses: Course[] = [];
  instructorCourses: Course[] = [];
  chkInst: any;

  constructor(private dash: DashboardService, private router: Router) {}

  ngOnInit(): void {
    this.dash.getCourses().subscribe((crs) =>{
      this.allCourses = crs;
    })

    this.dash.getStudent().subscribe((st) =>{
      this.student = st;
    })

    this.dash.getInstructor().subscribe((inst) =>{
      this.instructorAll = inst;
    })
    this.loadUserData();
  }

  loadInstructorCourses(){
    this.dash.getCourses().subscribe((crs) =>{
      this.instCourses = crs;
      this.instructorCourses = this.instCourses.filter(cour => cour.instructor_id === this.currentInst.instructorId);
      console.log("cour",this.instructorCourses);
    })
  }

  loadUserData() {
    this.dash.getCurrentUserData().subscribe((data) =>{
      this.chkInst = data;
      console.log(this.chkInst);
      
      if(this.chkInst.role === 'User' || this.chkInst.role === 'Admin'){
        console.log("i'm user");
        
        this.currentUser = data;
        if (!this.currentUser || !this.currentUser.role) {
          this.router.navigate(['/login']); 
          return;
        }
    
        this.role = this.currentUser.role;
        this.loadCourses(this.currentUser.purchasedCourses);
        this.loadRecommendedCourses(this.currentUser.interests);
      }else{
        console.log("i'm inst");
        this.currentInst = data;
        console.log("dataaa",this.currentInst);
        
        if (!this.currentInst || !this.currentInst.role) {
          this.router.navigate(['/login']); 
          return;
        }
    
        this.role = this.currentInst.role;
        this.loadInstructorCourses();
      }
    });
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
