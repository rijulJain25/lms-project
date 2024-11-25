import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InstructorService } from '../instructor-page/instructor.service';
import { SnackbarService } from 'src/app/components/snackbar.service';
import { nameNoNumbersValidator } from 'src/app/components/custom-validators';

@Component({
  selector: 'app-add-instructor',
  templateUrl: './add-instructor.component.html',
  styleUrls: ['./add-instructor.component.css']
})
export class AddInstructorComponent implements OnInit {
  instructorForm!: FormGroup;
  specializations: string[] = [];
  defaultImage: string = "assets/images/teacher3.png";
  defaultUsername: string = "instructor123";
  currentUser: string = '';

  constructor(
    private fb: FormBuilder,
    private instService: InstructorService,
    private router: Router,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.instService.getInstructors().subscribe(instructors => {
      this.specializations = this.getSpecializations(instructors);
    });

    this.instructorForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), nameNoNumbersValidator()]],
      email: ['', [Validators.required, Validators.email]],
      bio: ['', [Validators.required, Validators.minLength(10)]],
      specialization: ['', Validators.required],
      experience: ['', [Validators.required]],
      linkedin: [''],
      twitter: [''],
      location: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  getSpecializations(instructors: any[]): string[] {
    const specializations = new Set<string>();
    instructors.forEach(inst => {
      if (inst.specialization) {
        specializations.add(inst.specialization);
      }
    });
    return Array.from(specializations); 
  }

  // Submit the form
  onSubmit(): void {
    if (this.instructorForm.valid) {
      const newInstructor = this.instructorForm.value;
      newInstructor.image = this.defaultImage;
      newInstructor.role = 'Instructor';
      newInstructor.reviewIns = Math.floor(Math.random() * 5) + 1;
      newInstructor.username = this.defaultUsername + Math.floor(Math.random() * 1000);

      this.instService.addInstructor(newInstructor).subscribe( () => { 
        this.snackbarService.showSuccess('Instructor added successfully!'); 
        this.router.navigate(['/instructor']);
    });
  }
  }
}
