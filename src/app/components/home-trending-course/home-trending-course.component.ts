import { Component, OnInit } from '@angular/core';
import { TrendingCoursesService } from './trending-courses.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home-trending-course',
  templateUrl: './home-trending-course.component.html',
  styleUrls: ['./home-trending-course.component.css']
})
export class HomeTrendingCourseComponent implements OnInit {

  trendingCourses$!: Observable<any[]>; 
  courseDetails: any[] = []; 

  constructor(private trendingCoursesService: TrendingCoursesService) {}

  ngOnInit(): void {
    this.trendingCoursesService.getTrendingCourses().subscribe((trendingCourses) => {
      const courseIds = trendingCourses.map((course) => course.courseId);

      this.trendingCoursesService.getCourseDetails(courseIds).subscribe((courses) => {
        this.courseDetails = courses;  
      });
    });
  }

}
