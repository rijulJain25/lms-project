import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CourseDetailService } from 'src/app/pages/course-detail/course-detail.service';
import { SnackbarService } from '../snackbar.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
  courseId!: string;
  courseForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseDetailService,
    private snackBar: SnackbarService,
  ) {}

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id')!;

    this.initForm();

    this.courseService.getCourseById(this.courseId).subscribe(course => {
      this.populateForm(course);
    });
  }

  initForm(): void {
    this.courseForm = this.fb.group({
      name: [
        '',
        [Validators.required, Validators.pattern('^[A-Za-z ]+$')] // Only letters and spaces
      ],
      category: ['', Validators.required],
      description: ['', Validators.required],
      duration: [null, [Validators.required, Validators.min(1)]], // Duration should be at least 1 week
      price: [null, [Validators.required, Validators.min(0.01)]], // Price should be a positive number
      level: ['', Validators.required],
      courseContent: this.fb.array([]) // FormArray for weeks
    });
  }

  // Getter for courseContent FormArray
  get courseContent(): FormArray {
    return this.courseForm.get('courseContent') as FormArray;
  }

  // Add a week to the course content
  addWeek(): void {
    const weekGroup = this.fb.group({
      week: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], // Week should be a number
      title: ['', [Validators.required, Validators.minLength(3)]], // Title should have at least 3 characters
      description: ['']
    });
    this.courseContent.push(weekGroup);
  }

  // Remove a week from the FormArray
  removeWeek(index: number): void {
    this.courseContent.removeAt(index);
  }

  // Populate the form with course data
  populateForm(course: any): void {
    this.courseForm.patchValue({
      name: course.name,
      category: course.category,
      description: course.description,
      duration: course.duration,
      price: course.price,
      level: course.level
    });

    const courseContentArray = this.courseForm.get('courseContent') as FormArray;
    course.courseContent.forEach((content: any) => {
      courseContentArray.push(this.fb.group({
        week: [content.week, [Validators.required, Validators.pattern('^[0-9]+$')]], // Validate week as number
        title: [content.title, [Validators.required, Validators.minLength(3)]], // Validate title length
        description: [content.description]
      }));
    });
  }

  // Handle form submission
  onSubmit(): void {
    if (this.courseForm.valid) {
      this.courseService.updateCourse(this.courseId, this.courseForm.value).subscribe(
        () => {
          this.snackBar.showSuccess("Course Updated successfully!");
          this.router.navigate([`/course/${this.courseId}`]); // Redirect back to course details
        },
        (error) => {
          console.error('Error updating course:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
