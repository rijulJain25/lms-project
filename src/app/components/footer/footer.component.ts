import { Component, OnInit } from '@angular/core';
import emailjs from '@emailjs/browser';
import { SnackbarService } from '../snackbar.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  currentYear!: number;
  email: string = ''; 


  constructor(private snackbar: SnackbarService) { }

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
  }

  subscribeToNewsletter(event: Event): void {
    event.preventDefault();  

    if (this.isValidEmail(this.email)) {
      const templateParams = {
        from_email: this.email,  
      };

      emailjs.init('tyqxK6e2ug8gLXJj1');
      emailjs.send('service_lvvtsw7', 'template_h5r9dtb', templateParams)
        .then((response) => {
          console.log('SUCCESS!', response);
          this.snackbar.showSuccess('Subscription Successfull.');
          this.email = ''; 
        }, (error) => {
          console.log('FAILED...', error);
          this.snackbar.showError('There was an error subscribing. Please try again.');
        });
    } else {
      alert('Please enter a valid email address.');
    }
  }


  isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }


}
