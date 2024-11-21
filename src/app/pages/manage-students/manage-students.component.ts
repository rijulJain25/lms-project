import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/auth.service';
import { DashboardService } from '../dashboard-page/dashboard.service';
import { SnackbarService } from 'src/app/components/snackbar.service';

@Component({
  selector: 'app-manage-students',
  templateUrl: './manage-students.component.html',
  styleUrls: ['./manage-students.component.css']
})
export class ManageStudentsComponent implements OnInit {
  students: User[] = [];
  filteredStudents: User[] = [];
  showAddStudentForm: boolean = false;
  searchQuery: string = '';
  genderFilter: string = '';
  subscriptionFilter: string = '';
  pagedStudent: any[] = [];
  itemsPerPage: number = 9;
  totalPages: number = 1;
  currentPage: number =1;
  newStudent: any;
  studentToDel: any;

  constructor(private dash: DashboardService, private router: Router, private snackbarService: SnackbarService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.dash.getStudent().subscribe({
      next: (students) => {
        this.students = students;
        this.filteredStudents = students;
        this.updatePagedStudent();
      },
      error: (err) => console.error('Error loading students:', err)
    });
  }

  updatePagedStudent(){
    const startIndex = (this.currentPage -1)* this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedStudent = this.filteredStudents.slice(startIndex, endIndex);
  }

  getTotalPages() {
    this.totalPages = Math.ceil(this.filteredStudents.length / this.itemsPerPage);
    return this.totalPages;
  }

  goToPage(page: number) {
    if (page < 1 || page > this.getTotalPages()) return;
    this.currentPage = page;
    this.updatePagedStudent();
  }

  nextPage(){
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
      this.updatePagedStudent();
    }
  }

  previousPage(){
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedStudent();
    }
  }

  pageNumbers(){
    const pageCount = this.getTotalPages();
    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
      pages.push(i);
    }
    return pages;
  }


  toggleAddStudentForm(): void {
    this.showAddStudentForm = !this.showAddStudentForm;
  }

  addStudent(newStudent: any): void {
    console.log(newStudent);
    
    this.dash.createStudent(newStudent).subscribe({
      next: () => {
        this.loadStudents();
        this.showAddStudentForm = false; 
        console.log('Student added successfully');
        this.snackbarService.showSuccess('Student added successfully!'); 

      },
      error: (err) => {
        console.error('Error adding student:', err);
        this.snackbarService.showError('Something went wrong'); 
      }
    });
  }

  deleteStudent(student: any): void {
    console.log("Deleting student:", student);

    if (student && student.userId) {
      this.dash.deleteStudent(student.userId).subscribe({
        next: () => {
          this.students = this.students.filter(stu => stu.userId !== student.userId);
          this.filteredStudents = this.filteredStudents.filter(stu => stu.userId !== student.userId);
          this.closeModal();
          console.log('Student deleted successfully');
        },
        error: (err) => {
          console.error('Error deleting student:', err);
        }
      });
    }
  }

  openDeleteModal(student: any) {
    this.studentToDel = student;
  }

  closeModal() {
    this.studentToDel = null;
  }

  editStudent(student: User): void {
    this.router.navigate([`/edit-student/${student.userId}`]);
  }

  filterData(): void {
    this.filteredStudents = this.students.filter(student => {
      const matchesGender = this.genderFilter ? student.gender === this.genderFilter : true;
      const matchesSubscription = this.subscriptionFilter ? student.subscription === this.subscriptionFilter : true;
      const matchesSearch = this.searchQuery ? 
        student.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
        student.email.toLowerCase().includes(this.searchQuery.toLowerCase()) : true;

      return matchesGender && matchesSubscription && matchesSearch;
    });
  }
}
