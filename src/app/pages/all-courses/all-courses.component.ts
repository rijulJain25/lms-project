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
  pagedCourses: any[] = [];
  searchTerm: string = '';
  selectedCategory: string = '';
  teacherName: string = '';  // New property for filtering by teacher name
  currentPage: number = 1;
  itemsPerPage: number = 8;
  totalPages: number = 1;

  constructor(private courseService: AllCoursesService) { }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(data => {
      this.courses = data;
      this.filteredCourses = data;
      this.updatePagedCourses();
    });
  }

  filterCourses() {
    this.filteredCourses = this.courses.filter(course => {
      const matchesCategory = this.selectedCategory ? course.category === this.selectedCategory : true;
      const matchesSearchTerm = this.searchTerm ? course.name.toLowerCase().includes(this.searchTerm.toLowerCase()) : true;
      const matchesTeacherName = this.teacherName ? course.instructor.name.toLowerCase().includes(this.teacherName.toLowerCase()) : true;
      return matchesCategory && matchesSearchTerm && matchesTeacherName;
    });

    this.currentPage = 1;  // Reset to the first page when filters change
    this.updatePagedCourses();
  }

  updatePagedCourses() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedCourses = this.filteredCourses.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.getTotalPages()) return;
    this.currentPage = page;
    this.updatePagedCourses();
  }

  nextPage() {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
      this.updatePagedCourses();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedCourses();
    }
  }

  getTotalPages() {
    this.totalPages = Math.ceil(this.filteredCourses.length / this.itemsPerPage);
    return this.totalPages;
  }

  // Method to generate the page numbers for pagination
  pageNumbers() {
    const pageCount = this.getTotalPages();
    let pages = [];

    for (let i = 1; i <= pageCount; i++) {
      pages.push(i);
    }

    return pages;
  }

  scrollToCourses() {
    const element = document.getElementById('container-cour');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
