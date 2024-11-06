import { Component, OnInit } from '@angular/core';
import { AllCoursesService } from './all-courses.service';

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.css']
})
export class AllCoursesComponent implements OnInit {

  courses: any[] = [];
  filteredCourses: any[] = [];
  searchTerm: string = '';
  selectedCategory: string = '';

  constructor(private courseService: AllCoursesService) { }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(data => {
      this.courses = data;
      this.filteredCourses = data;
    });
  }

  filterCourses() {
    this.filteredCourses = this.courses.filter(course => {
      return (this.selectedCategory ? course.category === this.selectedCategory : true) &&
             (this.searchTerm ? course.name.toLowerCase().includes(this.searchTerm.toLowerCase()) : true);
    });
  }

  scrollToCourses(){
    const element = document.getElementById('container-cour');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

}
