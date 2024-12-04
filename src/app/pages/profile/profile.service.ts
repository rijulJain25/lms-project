import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  getUserById(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/${userId}`);
  }

  updateUser(userId: string, userData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/users/${userId}`, userData);
  }
  

  updatePassword(email: string, newPassword: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/users/update-password`, { email: email, password:newPassword });
  }
  
  verifyOldPassword(email: string, oldPassword: string): Observable<any> { 
    return this.http.post<boolean>(`${this.apiUrl}/users/loginByEmail`, { email: email, password:oldPassword } );
  }

}
