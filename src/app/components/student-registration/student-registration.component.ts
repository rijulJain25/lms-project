import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.css']
})
export class StudentRegistrationComponent {
  step1Form: FormGroup;
  step2Form: FormGroup;
  step3Form: FormGroup;
  currentStep: number = 1;
  errorMessage: string = '';
  successMessage: string = '';
  isSubmitting: boolean = false;
  selectedOptions: any[] = []; 
  isLengthMore: boolean = false;

  selectedInterests: string[] = []; 
  interestList: string[] = ['Technology', 'Science', 'Arts', 'Sports', 'Music', 'Travel'];  // Example list of interests

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.step1Form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator]],
    })

    this.step2Form = this.fb.group({
      gender: ['', Validators.required],
      interests: [[], Validators.required],
      bio: ['', Validators.required],
      role: ['User', Validators.required],
    });

    this.step3Form = this.fb.group({
      username: ['default_name'],
      profilePhoto: ['assets/images/teacher3.png', Validators.required],
      currentInstitution: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\+?[0-9]{10,15}$/)]],
      location: ['', Validators.required],
      subscription: ['free']
    });
  }

  ngOnInit(): void {}

  passwordValidator(control: any) {
    const value = control.value;
    return !/[!@#$%^&*]/.test(value) ? { specialCharacter: true } : null;
  }

  onInterestChange(event: any): void {
    const selectedInterest = event.target.value;
  
    if (!this.selectedOptions.includes(selectedInterest)) {
      this.selectedOptions.push(selectedInterest);
    }
    
    this.step2Form.get('interests')?.setValue(this.selectedOptions);
  
    if (this.selectedOptions.length >= 4) {
      this.step2Form.get('interests')?.disable(); 
    } else {
      this.step2Form.get('interests')?.enable();
    }
    
    this.selectedInterests = this.selectedOptions;
    console.log("Selected Interests: ", this.selectedInterests);
  }
  


  removeInterest(interest: string): void {
    const currentInterests = this.step2Form.controls['interests'].value;
    const index = currentInterests.indexOf(interest);
    if (index !== -1) {
      currentInterests.splice(index, 1); 
      this.step2Form.controls['interests'].setValue([...currentInterests]); 
      if (this.selectedOptions.length <= 4) {
        this.step2Form.get('interests')?.enable();
      }
    }
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
      this.showErrorMessage('Please upload a profile photo and provide contact details');
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
    };

    this.isSubmitting = true;

    
    this.authService.register(formData).subscribe(
      response => {
        console.log('Registration successful:', response);
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
}
