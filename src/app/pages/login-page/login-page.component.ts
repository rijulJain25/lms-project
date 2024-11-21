import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string = '';
  isSubmitting: boolean = false; 
  loginType: string = 'instructors';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, 
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onToggleChange() {
    this.loginType = this.loginType === 'users'? 'instructors' : 'users';
    console.log(this.loginType);
    console.log('Login Type Changed:', this.loginType);
  }

  submitForm() {
    if (this.loginForm.invalid) {
      this.showErrorMessage('Please fill in all required fields correctly.');
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const { email, password } = this.loginForm.value;
    console.log("sdjoij", this.loginType);
    

    const loginEndpoint = this.loginType === 'instructors' ? 'instructors' :  'users';
    

    console.log("Thsi is the type", loginEndpoint);
    
    this.authService.login(email, password, loginEndpoint).subscribe(
      (user) => {
        console.log(user);
        
        if (user) {
          this.authService.saveUserToLocalStorage(user);
          console.log('Login successful', user);
          location.replace('/dashboard');

          // this.router.navigate(['/dashboard']);    
          
        } else {
          this.showErrorMessage('Invalid email or password. Please try again.');
        }
        this.isSubmitting = false; 
      },
      (error) => {
        this.showErrorMessage('An error occurred. Please try again later.');
        this.isSubmitting = false; 
      }
    );
  }

  showErrorMessage(message: string) {
    this.errorMessage = message;
  }
}
