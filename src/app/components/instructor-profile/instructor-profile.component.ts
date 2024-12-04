import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { ProfileService } from 'src/app/pages/profile/profile.service';
import { InstProfileService } from './inst-profile.service';
import { SnackbarService } from '../snackbar.service';

@Component({
  selector: 'app-instructor-profile',
  templateUrl: './instructor-profile.component.html',
  styleUrls: ['./instructor-profile.component.css']
})
export class InstructorProfileComponent {
  user: any;
  userId!: string;
  isLoading: boolean = true;
  isEditing: boolean = false;
  isChangingPassword: boolean = false;
  currentUser: any;

  profileForm: FormGroup;
  passwordForm: FormGroup;

  constructor(
    private instService: InstProfileService,
    private authservice: AuthService,
    private fb: FormBuilder,
    private snackBar: SnackbarService
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      specialization: ['', Validators.required],
      experience: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      location: ['', Validators.required],
      bio: ['', [Validators.required]]
    });

    this.passwordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.currentUser = this.authservice.getCurrentUser();
    this.userId = this.authservice.getCurrentUser().instructorId;
    console.log(this.userId);
    
    this.fetchUserData();
  }

  fetchUserData(): void {
    this.instService.getInstructorById(this.userId).subscribe((data) => {
      this.user = data;
      this.isLoading = false;

      this.profileForm.patchValue({
        name: this.user.name,
        email: this.user.email,
        bio: this.user.bio,
        specialization: this.user.specialization,
        experience: this.user.experience,
        location: this.user.location,
      });
    });
  }

  toggleEditMode(): void {
    this.isEditing = !this.isEditing;
  }

  updateUser(): void {
    if (this.profileForm.invalid) {
      alert("Please fill out all required fields correctly.");
      return;
    }

    this.instService.updateInstructor(this.userId, this.profileForm.value).subscribe((updatedUser) => {
      this.user = updatedUser;
      this.isEditing = false;
    });
  }

  togglePasswordChange(): void {
    this.isChangingPassword = !this.isChangingPassword;
  }

  changePassword(): void {
    if (this.passwordForm.invalid) {
      this.snackBar.showError("Please fill out all fields correctly.");
      return;
    }
  
    if (this.passwordForm.value.newPassword !== this.passwordForm.value.confirmPassword) {
      this.snackBar.showError("Passwords do not match");
      return;
    }
  
    this.instService.verifyOldPassword(this.user.email, this.passwordForm.value.oldPassword)
      .subscribe(
        (isValidOldPassword) => {
          if (isValidOldPassword) {
            this.instService.updateInstPassword(this.user.email, this.passwordForm.value.newPassword)
              .subscribe(response => {
                this.snackBar.showSuccess("Password updated successfully");
                this.isChangingPassword = false;
              }, error => {
                this.snackBar.showError("Error updating password.");
              });
          } else {
            this.snackBar.showError("Old password is incorrect");
          }
        },
        (error) => {
          this.snackBar.showError("An error occurred while verifying old password.");
        }
      );
  }
}
