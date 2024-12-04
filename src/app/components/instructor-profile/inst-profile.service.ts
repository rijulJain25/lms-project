import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstProfileService {

  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  getInstructorById(instId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/instructors/${instId}`);
  }

  updateInstructor(instId: string, userData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/instructors/${instId}`, userData);
  }
  

  updateInstPassword(email: string, newPassword: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/instructors/update-password`, {email: email, newPassword :newPassword  });
  }

  verifyOldPassword(email: string, oldPassword: string): Observable<any> {
    return this.http.post<boolean>(`${this.apiUrl}/instructors/loginByEmail`, { email: email, password:oldPassword });
  }
  
}
