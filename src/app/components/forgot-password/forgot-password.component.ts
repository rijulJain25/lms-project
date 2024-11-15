import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  ValidateForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  validateEmail: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.ValidateForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.forgotPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  passwordValidator(control: any) {
    const value = control.value;
    return !/[!@#$%^&*]/.test(value) ? { specialCharacter: true } : null;
  }

  onSubmit() {
    if (this.ValidateForm.invalid) {
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }

    const email = this.ValidateForm.value.email;
    this.authService.forgotPassword(email).subscribe(
      (response) => {
        if (response) {
          this.successMessage = 'Email verified. Please enter your new password.';
          this.errorMessage = '';
          this.validateEmail = true; 
        } else {
          this.errorMessage = 'Email not found.';
          this.successMessage = '';
        }
      },
      (error) => {
        this.errorMessage = 'An error occurred while verifying the email.';
        this.successMessage = '';
      }
    );
  }

  onSubmitPass() {
    if (this.forgotPasswordForm.invalid || this.forgotPasswordForm.value.password !== this.forgotPasswordForm.value.confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }

    const email = this.ValidateForm.value.email;
    const newPassword = this.forgotPasswordForm.value.password;

    this.authService.updatePassword(email, newPassword).subscribe(
      (response) => {
        this.successMessage = 'Password updated successfully!';
        this.errorMessage = '';
        this.forgotPasswordForm.reset();
      },
      (error) => {
        this.errorMessage = 'An error occurred while updating the password.';
        this.successMessage = '';
      }
    );
  }
}
