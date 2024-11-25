import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-set-new-password',
  templateUrl: './set-new-password.component.html',
  styleUrls: ['./set-new-password.component.css']
})
export class SetNewPasswordComponent implements OnInit {
  newPasswordForm: FormGroup;
  errorMessage: string = '';
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.newPasswordForm = this.fb.group({
      newPassword: ['', [
        Validators.required, 
        Validators.minLength(6)  
      ]],
      confirmPassword: ['', [
        Validators.required
      ]]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {}

  passwordMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
    const password = form.get('newPassword');
    const confirmPassword = form.get('confirmPassword');
    if (password?.value !== confirmPassword?.value) {
      return { 'passwordMismatch': true };
    }
    return null;
  }

  submitNewPassword() {
    if (this.newPasswordForm.invalid) {
      this.errorMessage = 'Please fill in all fields correctly.';
      return;
    }

    const { newPassword, confirmPassword } = this.newPasswordForm.value;

    this.isSubmitting = true;
    this.errorMessage = '';

    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.authService.updatePasswordInst(currentUser.email, newPassword).subscribe(
        (response) => {
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          this.errorMessage = 'An error occurred while setting your password. Please try again.';
          this.isSubmitting = false;
        }
      );
    }
  }
}
