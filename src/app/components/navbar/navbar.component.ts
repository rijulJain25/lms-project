// navbar.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser: any = null;
  userRole: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    
    if (user && Object.keys(user).length > 0) {
      this.currentUser = user;
      this.userRole = user?.role || null;
    } else {
      this.currentUser = null;
    }
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
    window.location.reload();
  }

  // Navigate to the profile page
  goToProfile(): void {
    this.router.navigate(['/profile']);
  }
}
