import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { ProfileService } from 'src/app/pages/profile/profile.service';
import { SnackbarService } from '../snackbar.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  user: any;
  userId!: string;
  isLoading: boolean = true;
  isEditing: boolean = false;
  isChangingPassword: boolean = false;
  currentUser: any;

  profileForm: FormGroup;
  passwordForm: FormGroup;

  constructor(
    private userService: ProfileService,
    private authservice: AuthService,
    private fb: FormBuilder,
    private snackBar: SnackbarService
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: [''],
      currentInstitution: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      interests: ['', Validators.required],
      subscription: ['', Validators.required]
    });

    this.passwordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.currentUser = this.authservice.getCurrentUser();
    this.userId = this.authservice.getCurrentUser().userId;
    this.fetchUserData();
  }

  fetchUserData(): void {
    this.userService.getUserById(this.userId).subscribe((data) => {
      this.user = data;
      this.isLoading = false;

      // Populate the form with user data
      this.profileForm.patchValue({
        name: this.user.name,
        email: this.user.email,
        bio: this.user.bio,
        gender: this.user.gender,
        currentInstitution: this.user.currentInstitution,
        phoneNumber: this.user.phoneNumber,
        interests: this.user.interests,
        subscription: this.user.subscription
      });
    });
  }

  toggleEditMode(): void {
    this.isEditing = !this.isEditing;
  }

  updateUser(): void {
    if (this.profileForm.invalid) {
      this.snackBar.showError("Please fill out all required fields correctly.");
      return;
    }

    this.userService.updateUser(this.userId, this.profileForm.value).subscribe((updatedUser) => {
      this.user = updatedUser;
      this.isEditing = false;
      this.snackBar.showSuccess("Updated successfully");
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

    this.userService.verifyOldPassword(this.user.email, this.passwordForm.value.oldPassword)
      .subscribe(
        (isValidOldPassword) => {
          if (isValidOldPassword) {
            this.userService.updatePassword(this.user.email, this.passwordForm.value.newPassword)
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
