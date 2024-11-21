import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InstructorService } from '../instructor-page/instructor.service';
import { Instructor } from 'src/app/components/intructor-registration/intructor-registration.component';
import { SnackbarService } from 'src/app/components/snackbar.service';

@Component({
  selector: 'app-edit-instructor',
  templateUrl: './edit-instructor.component.html',
  styleUrls: ['./edit-instructor.component.css']
})
export class EditInstructorComponent implements OnInit {

  instructorForm: FormGroup;
  instructorId!: string;
  instructor!: Instructor;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private instService: InstructorService,
    private router: Router,
    private snackbarService: SnackbarService,
  ) {
    this.instructorForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      specialization: ['', [Validators.required]],
      experience: ['', [Validators.required]],
      bio: ['', [Validators.required]],
      location: ['', [Validators.required]],
      image: ['', []], // Optional field
      socialLinks: this.fb.group({
        facebook: [''],
        twitter: [''],
        linkedin: ['']
      })
    });
  }

  ngOnInit(): void {
    this.instructorId = this.route.snapshot.paramMap.get('id')!;
    this.loadInstructorData();
  }

  loadInstructorData() {
    this.instService.getInstructors().subscribe(instructors => {
      const currentInstructor = instructors.find((inst: any) => inst.instructorId === this.instructorId);
      if (currentInstructor) {
        this.instructor = currentInstructor;
        this.instructorForm.patchValue({
          name: this.instructor.name,
          email: this.instructor.email,
          specialization: this.instructor.specialization,
          experience: this.instructor.experience,
          bio: this.instructor.bio,
          location: this.instructor.location,
          image: this.instructor.image,
          socialLinks: this.instructor.socialLinks
        });
      }
    });
  }

  onSubmit() {
    if (this.instructorForm.valid) {
      const updatedInstructor = this.instructorForm.value;
      console.log(updatedInstructor);
      
      this.instService.updateInstructor(this.instructorId, updatedInstructor).subscribe(
        (response) => {
          this.snackbarService.showSuccess('Instructor Updated successfully!'); 
          this.router.navigate(['/instructors']);
        },
        (error) => {
          console.error('Error updating instructor:', error);
        }
      );
    }
  }
}
