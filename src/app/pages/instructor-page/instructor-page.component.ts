import { Component, OnInit } from '@angular/core';
import { InstructorService } from './instructor.service';
import { AuthService, User } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-instructor-page',
  templateUrl: './instructor-page.component.html',
  styleUrls: ['./instructor-page.component.css']
})
export class InstructorPageComponent implements OnInit {

  constructor(private instService: InstructorService, private authService: AuthService) { }

  instructor: any[] = [];
  filterInstructor: any[] = [];
  PagesInst: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 1;
  searchTerm: string = '';
  selectedSpecializations: string[] = []; 
  allSpecializations: string[] = [];
  courses: any[] = []; 
  currentUser: String = "";
  instructorToDelete: any;


  ngOnInit(): void {
    // Fetch instructors and courses
    this.instService.getInstructors().subscribe(inst => {
      this.instructor = inst;
      this.filterInstructor = inst;
      this.updateSpecializations(inst);  
      this.updatePage();
    });

    this.instService.getCourses().subscribe(courses => {
      console.log(courses);
      this.courses = courses;
    });

    this.currentUser = this.authService.getCurrentUser().role;    
  }

  updateSpecializations(instructors: any[]) {
    const specializations = new Set<string>(); 
    instructors.forEach(inst => {
      if (inst.specialization) {
        specializations.add(inst.specialization);
      }
    });
    this.allSpecializations = Array.from(specializations);  
  }

  updatePage() {
    const stIdx = (this.currentPage - 1) * this.itemsPerPage;
    const endIdx = stIdx + this.itemsPerPage;
    this.PagesInst = this.filterInstructor.slice(stIdx, endIdx);
    this.totalPages = Math.ceil(this.filterInstructor.length / this.itemsPerPage);
  }

  openDeleteModal(instructor: any) {
    this.instructorToDelete = instructor;
  }

  deleteInstructor(instructor: any) {
    console.log("THis is ",instructor);
    
    if (instructor) {
      this.instService.deleteInstructor(instructor.instructorId).subscribe(() => {
        this.instructor = this.instructor.filter(inst => inst.instructorId !== instructor.id);
        this.filterInstructor = this.filterInstructor.filter(inst => inst.instructorId !== instructor.id);
      }, error => {
        console.error('Error deleting instructor', error);
      });
    }
  }

  closeModal() {
    this.instructorToDelete = null;
  }


  filterInstructorList() {
    this.filterInstructor = this.instructor.filter(inst => {
      const matchSearch = this.searchTerm ? inst.name.toLowerCase().includes(this.searchTerm.toLowerCase()) : true;
      const matchSpec = this.selectedSpecializations.length > 0 
        ? this.selectedSpecializations.includes(inst.specialization) 
        : true;
      return matchSearch && matchSpec;
    });
    this.currentPage = 1;  // Reset to first page
    this.updatePage();
  }

  onFilterChange(spec: string) {
    if (this.selectedSpecializations.includes(spec)) {
      this.selectedSpecializations = this.selectedSpecializations.filter(s => s !== spec);
    } else {
      this.selectedSpecializations.push(spec);
    }
    this.filterInstructorList();
  }

  getRoundedReviews(reviews: number): number {
    return Math.floor(reviews); // Round down the review value
  }

  countLessons(instructorId: string): number {
    console.log(this.courses.filter(course => course.instructor_id === instructorId).length);
    return this.courses.filter(course => course.instructor_id === instructorId).length;
  }

  CalNumReview() {
    return Math.floor(Math.random() * (50 - 10 + 1)) + 10;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePage();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePage();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePage();
    }
  }
}
