import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  submitForm() {
    if (this.loginForm.invalid) {
      this.showErrorMessage();
      return;
    }
    
    const formData = this.loginForm.value;
    console.log(formData);
    // Handle form submission logic here
  }

  showErrorMessage() {
    this.errorMessage = 'Please fill in all required fields correctly.';
  }

}
