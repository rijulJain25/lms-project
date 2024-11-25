import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { nameNoNumbersValidator } from 'src/app/components/custom-validators';
import { SnackbarService } from 'src/app/components/snackbar.service';

@Component({
  selector: 'app-contact-us-page',
  templateUrl: './contact-us-page.component.html',
  styleUrls: ['./contact-us-page.component.css']
})
export class ContactUsPageComponent implements OnInit {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private snackBar: SnackbarService) {
    // Initialize the form group with validation
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, nameNoNumbersValidator(), Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  sendEmail(formData: any): void {
    emailjs.init('tyqxK6e2ug8gLXJj1');
    emailjs.send("service_lsvts8c", "template_32qoduh", {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message
    })
    .then((response) => {
      console.log('SUCCESS!', response);
      this.snackBar.showSuccess('Your message has been sent successfully!');
      this.contactForm.reset();
    })
    .catch((error) => {
      console.error('FAILED...', error);
      this.snackBar.showError('There was an error sending your message. Please try again later.');
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      this.sendEmail(formData);
    } else {
      alert('Please fill in all the fields correctly.');
    }
  }
}
