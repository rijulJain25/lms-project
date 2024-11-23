import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DashboardService } from '../dashboard-page/dashboard.service';
import { AuthService } from 'src/app/auth/auth.service';
import { SnackbarService } from 'src/app/components/snackbar.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-courses.component.html',
  styleUrls: ['./add-courses.component.css']
})
export class AddCoursesComponent implements OnInit {
  addCourseForm!: FormGroup;
  currentInst: any;
  levels = ['Beginner', 'Intermediate', 'Advanced'];

  constructor(private fb: FormBuilder, private authService: AuthService, private dash: DashboardService, private router: Router, private snackBar: SnackbarService) {}

  ngOnInit(): void {

    this.currentInst = this.authService.getCurrentUser();

    // Initialize the form
    this.addCourseForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(1)]],
      instructor_id: [this.currentInst.instructorId],
      img: ['assets/images/businessAna.png'],
      reviews: [[]],
      level: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      courseContent: this.fb.array([]),  // Initialize as an empty array
      prerequisites: this.fb.array([]),
      faq: this.fb.array([]),
    });
  }

  get courseContent() {
    return this.addCourseForm.get('courseContent') as FormArray;
  }

  get prerequisites() {
    return this.addCourseForm.get('prerequisites') as FormArray;
  }

  get faq() {
    return this.addCourseForm.get('faq') as FormArray;
  }

  addCourseContent() {
    const courseContentGroup = this.fb.group({
      week: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.courseContent.push(courseContentGroup);
  }

  removeCourseContent(index: number) {
    this.courseContent.removeAt(index);
  }

  addPrerequisite() {
    this.prerequisites.push(this.fb.control(''));
  }

  removePrerequisite(index: number) {
    this.prerequisites.removeAt(index);
  }

  addFaq() {
    this.faq.push(this.fb.group({
      question: ['', Validators.required],
      answer: ['', Validators.required]
    }));
  }

  removeFaq(index: number) {
    this.faq.removeAt(index);
  }

  onSubmit() {
    if (this.addCourseForm.valid) {
      console.log(this.addCourseForm.value);
    }

    this.dash.addCourse(this.addCourseForm.value).subscribe(data => {
      this.router.navigate(['/created-courses']);
      this.snackBar.showSuccess("Course added successfully")
    })
  }
}
