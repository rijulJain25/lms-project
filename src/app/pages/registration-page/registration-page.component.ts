import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {
  step1Form: FormGroup;
  step2Form: FormGroup;
  currentStep: number = 1;
  errorMessage: string = '';

  constructor(private fb: FormBuilder) {
    this.step1Form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator]],
    });

    this.step2Form = this.fb.group({
      gender: ['', Validators.required],
      designation: ['', Validators.required],
      interest: ['', Validators.required],
      bio: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  passwordValidator(control: any) {
    const value = control.value;
    return !/[!@#$%^&*]/.test(value) ? { specialCharacter: true } : null;
  }

  nextStep() {
    if (this.currentStep === 1 && this.step1Form.invalid) {
      this.showErrorMessage();
      return;
    }

    if (this.currentStep === 2 && this.step2Form.invalid) {
      this.showErrorMessage();
      return;
    }

    this.currentStep++;
    this.errorMessage = ''; // Clear error message on successful step change
  }

  submitForm() {
    if (this.step1Form.invalid || this.step2Form.invalid) {
      this.showErrorMessage();
      return;
    }
    
    const formData = {
      ...this.step1Form.value,
      ...this.step2Form.value
    };
    
    console.log(formData);
    alert("Registered Successfully")
    // Handle form submission here
  }

  showErrorMessage() {
    this.errorMessage = 'Please fill the form properly';
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.errorMessage = ''; // Clear error message when going back
    }
  }

  LoginPage() {
    // Logic to navigate to login page
  }

  get step1Controls() {
    return this.step1Form.controls;
  }

  get step2Controls() {
    return this.step2Form.controls;
  }
}
