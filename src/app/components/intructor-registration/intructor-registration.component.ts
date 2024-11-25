import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { nameNoNumbersValidator } from '../custom-validators';
import { emailExistsValidator } from '../email-exists.';

export interface Instructor {
  name: string;
  email: string;
  bio: string;
  reviewIns: number;
  image: string;
  specialization: string;
  experience: string;
  socialLinks: {
    linkedin: string;
    twitter: string;
  };
  location: string;
  username: string;
  password: string;
  isFirstLogin: boolean;
  ownRegistered: boolean;
}

@Component({
  selector: 'app-intructor-registration',
  templateUrl: './intructor-registration.component.html',
  styleUrls: ['./intructor-registration.component.css']
})
export class IntructorRegistrationComponent implements OnInit {
  step1Form: FormGroup;
  step2Form: FormGroup;
  step3Form: FormGroup;
  currentStep: number = 1;
  errorMessage: string = '';
  successMessage: string = '';
  isSubmitting: boolean = false;
  categories: string[] = [];  // Store unique categories here

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.step1Form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), nameNoNumbersValidator()]],
      email: ['', [Validators.required, Validators.email], [emailExistsValidator(this.authService)]],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator]],
    });

    this.step2Form = this.fb.group({
      bio: ['', Validators.required],
      specialization: ['', Validators.required],
      experience: ['', Validators.required],
    });

    this.step3Form = this.fb.group({
      socialLinks: this.fb.group({
        linkedin: ['', Validators.required],
        twitter: ['', Validators.required]
      }),
      username: ['default_username'],
      profilePhoto: ['assets/images/teacher3.png', Validators.required],
      location: ['', Validators.required],
      reviewIns: ['4'],
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  passwordValidator(control: any) {
    const value = control.value;
    return !/[!@#$%^&*]/.test(value) ? { specialCharacter: true } : null;
  }

  nextStep() {
    if (this.currentStep === 1 && this.step1Form.invalid) {
      this.showErrorMessage('Please fill the form properly');
      return;
    }

    if (this.currentStep === 2 && this.step2Form.invalid) {
      this.showErrorMessage('Please fill the form properly');
      return;
    }

    if (this.currentStep === 3 && this.step3Form.invalid) {
      this.showErrorMessage('Please upload a profile photo and provide location');
      return;
    }

    this.currentStep++;
    this.errorMessage = '';  
  }

  submitForm() {
    if (this.step1Form.invalid || this.step2Form.invalid || this.step3Form.invalid) {
      this.showErrorMessage('Please fill the form properly');
      return;
    }

    const formData = {
      ...this.step1Form.value,
      ...this.step2Form.value,
      ...this.step3Form.value,
      reviewIns: 0,
      image: 'assets/images/default-profile.png', 
      isFirstLogin: false,
      ownRegistered: true,
    };

    this.isSubmitting = true;

    this.authService.registerInstructor(formData).subscribe(
      response => {
        console.log('Instructor registration successful:', response);
        this.successMessage = 'Registration successful! Redirecting to login page...';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error => {
        console.error('Error during registration:', error);
        this.errorMessage = 'Something went wrong. Please try again.';
        this.isSubmitting = false;
      }
    );
  }

  showErrorMessage(message: string) {
    this.errorMessage = message;
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.errorMessage = '';
    }
  }

  get step1Controls() {
    return this.step1Form.controls;
  }

  get step2Controls() {
    return this.step2Form.controls;
  }

  get step3Controls() {
    return this.step3Form.controls;
  }

  loadCategories() {
    this.authService.getCourses().subscribe(courses => {
      const allCategories = courses.map(course => course.category);
      this.categories = [...new Set(allCategories)]; 
    });
  }
}
