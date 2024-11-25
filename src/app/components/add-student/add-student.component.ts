import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, Course } from 'src/app/auth/auth.service';
import { nameNoNumbersValidator } from '../custom-validators';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent {
  @Output() studentAdded = new EventEmitter<any>();

  studentForm: FormGroup;
  formatedDate!: string;
  genderOptions = ['Male', 'Female', 'Other'];
  subscriptionOptions = ['Free', 'Premium', 'Gold'];
  allSpecializations: string[] = [];
  selectedOptions: string[] = [];
  selectedInterests: string[] = [];
  allCourses: Course[] = [];

  constructor(private fb: FormBuilder, private authService: AuthService) {
    // Initialize the form group with validation
    this.studentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), nameNoNumbersValidator()]],
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
      username: ['default_name'],
      profilePhoto: ['assets/images/teacher2.png'],
      enrollmentDate: [this.formatedDate],
      purchasedCourses: [[]],
      role: ['User'],
    });
  }

  ngOnInit(): void {
    this.authService.getCourses().subscribe(courses => {
      this.allCourses = courses;
      this.updateSpecializations(this.allCourses);
    })
    
  }

  get f() { return this.studentForm.controls; }

  updateSpecializations(courses: any[]) {
    const specializations = new Set<string>(); 
    courses.forEach(crs => {
      if (crs.category) {
        specializations.add(crs.category);
      }
    });
    this.allSpecializations = Array.from(specializations);  
  }

  extractTextAfterColon(input: string): string {
    const textAfterColon = input.split(':')[1]?.trim();
    return textAfterColon || '';
  }

  onInterestChange(event: any): void {
    let selectedInterest = event.target.value;

    selectedInterest = this.extractTextAfterColon(selectedInterest);

    if (!this.selectedOptions.includes(selectedInterest)) {
      this.selectedOptions.push(selectedInterest);
    }

    console.log(this.selectedOptions);
    
    this.studentForm.get('interests')?.setValue(this.selectedOptions);

    if (this.selectedOptions.length >=4) {
      this.studentForm.get('interests')?.disable(); 
    } else {
      this.studentForm.get('interests')?.enable();
    }

    this.selectedInterests = this.selectedOptions;
    console.log("Selected Interests: ", this.selectedInterests);
  }

  removeInterest(interest: string): void {
    const currentInterests = this.studentForm.controls['interests'].value;
    const index = currentInterests.indexOf(interest);
    if (index !== -1) {
      currentInterests.splice(index, 1); 
      this.studentForm.controls['interests'].setValue([...currentInterests]);

      // Enable the select field if there are fewer than 5 options selected
      if (this.selectedOptions.length < 5) {
        this.studentForm.get('interests')?.enable();
      }
    }
  }

  // Handle form submission
  onSubmit(): void {
    if (this.studentForm.valid) {
      this.studentAdded.emit(this.studentForm.value);
    } else {
      console.log('Form is not valid');
      this.studentForm.markAllAsTouched();  
    }
  }
}
