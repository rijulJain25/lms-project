import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent {
  @Output() studentAdded = new EventEmitter<any>();

  studentForm: FormGroup;
  formatedDate!: string;

  // Options for gender and subscription
  genderOptions = ['Male', 'Female', 'Other'];
  subscriptionOptions = ['Free', 'Premium', 'Gold'];

  constructor(private fb: FormBuilder) {
    // Initialize the form group with validation
    this.studentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      currentInstitution: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      bio: ['', [Validators.required, Validators.minLength(10)]],
      interests: [[], Validators.required],
      location: ['', Validators.required],
      subscription: ['', Validators.required],
      username: ['default_namee'],
      profilePhoto: ['assets/images/teacher2.png'],
      enrollmentDate: [this.formatedDate],
      purchasedCourses: [[]],
      role: ['User'],
    });
  }

  get f() { return this.studentForm.controls; }

  onSubmit(): void {
    if (this.studentForm.valid) {
      this.studentAdded.emit(this.studentForm.value);
    } else {
      console.log('Form is not valid');
      this.studentForm.markAllAsTouched();  
    }
  }
}
