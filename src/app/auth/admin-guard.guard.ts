import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      const currentUser = this.authService.getCurrentUser();

      if (currentUser && currentUser.role === 'Admin') {
        return true;
      } else {
        this.router.navigate(['/login']); 
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
