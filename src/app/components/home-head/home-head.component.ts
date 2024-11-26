import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, Course } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-home-head',
  templateUrl: './home-head.component.html',
  styleUrls: ['./home-head.component.css']
})
export class HomeHeadComponent implements OnInit {

  availableCourses: Course[]= [];
  filteredCourses: Course[] = [];
  searchCour: string = '';
  searchForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.searchForm = new FormGroup({
      search: new FormControl('')  
    });
   }

  ngOnInit(): void {
    this.authService.getCourses().subscribe((courses: Course[]) => {
      this.availableCourses = courses;
      this.filteredCourses = [...this.availableCourses];
      this.searchForm.get('search')?.valueChanges.subscribe((value: string) => {
        this.searchCour = value;
        this.onSearchChange(); 
      });
      
    });
  }

  onSearchChange() : void {    
    if(this.searchCour.trim()){
      this.filteredCourses = this.availableCourses.filter(course => 
        course.name.toLowerCase().includes(this.searchCour.toLowerCase())
      );
      console.log(this.filteredCourses);
      
    }else{
      this.filteredCourses = [...this.availableCourses];
    }
  }

  onCourseSelect(course: Course): void {
    
    this.router.navigate(['/course', course.course_id]);
  }

}
