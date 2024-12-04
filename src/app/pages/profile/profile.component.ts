import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from './profile.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userId!: string;
  currentUser: any;
  

  constructor(
    private authservice: AuthService,
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authservice.getCurrentUser();
    this.userId = this.authservice.getCurrentUser().userId;
  }

}
