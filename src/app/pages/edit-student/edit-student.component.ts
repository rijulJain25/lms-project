import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/auth/auth.service';
import { DashboardService } from '../dashboard-page/dashboard.service';
import { SnackbarService } from 'src/app/components/snackbar.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent {
  editStudentForm!: FormGroup;
  studentId!: string;
  studentData!: User;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private dash: DashboardService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    // Get student ID from route params
    this.studentId = this.route.snapshot.paramMap.get('id')!;
    
    // Load student data
    this.loadStudentData();
  }

  loadStudentData(): void {
    this.dash.getStudentById(this.studentId).subscribe({
      next: (student) => {
        this.studentData = student;
        this.initializeForm();
      },
      error: (err) => console.error('Error loading student data', err)
    });
  }

  initializeForm(): void {
    console.log("thisssss",     this.studentData.name, this.studentData.dateOfBirth, this.studentData.gender
    );
    
    // Initialize form with existing student data
    this.editStudentForm = this.fb.group({
      name: [this.studentData.name, [Validators.required]],
      email: [this.studentData.email, [Validators.required, Validators.email]],
      username: [this.studentData.username, [Validators.required]],
      phoneNumber: [this.studentData.phoneNumber, [Validators.required]],
      currentInstitution: [this.studentData.currentInstitution, [Validators.required]],
      gender: [this.studentData.gender, [Validators.required]],
      dateOfBirth: [this.studentData.dateOfBirth, [Validators.required]],
      bio: [this.studentData.bio],
      interests: [this.studentData.interests],
      location: [this.studentData.location],
      subscription: [this.studentData.subscription, [Validators.required]]
    });
  }

  // Submit form to update student
  updateStudent(): void {
    if (this.editStudentForm.invalid) {
      return;
    }

    const updatedStudent = this.editStudentForm.value;
    this.dash.updateStudent(this.studentId, updatedStudent).subscribe({
      next: () => {
        this.snackbarService.showSuccess('Student updated successfully!');
        this.router.navigate(['/manage-students']);
      },
      error: (err) => {
        this.snackbarService.showError('Error updating student');
        console.error('Error updating student:', err);
      }
    });
  }

  // Handle form validation
  get formControls() {
    return this.editStudentForm.controls;
  }
}
