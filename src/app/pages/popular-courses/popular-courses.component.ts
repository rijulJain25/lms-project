import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TrendingCoursesService } from 'src/app/components/home-trending-course/trending-courses.service';

@Component({
  selector: 'app-popular-courses',
  templateUrl: './popular-courses.component.html',
  styleUrls: ['./popular-courses.component.css']
})
export class PopularCoursesComponent {
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
