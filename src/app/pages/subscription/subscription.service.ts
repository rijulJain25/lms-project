import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  private apiUrl = 'http://localhost:5000/api/users';

  constructor(private http: HttpClient) { }

  getUserData(): Observable<any> {
    const userId = JSON.parse(localStorage.getItem('currentUser') || '{}').userId;
    console.log(userId);
    
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  updateSubscription(subscription: string): Observable<any> {
    const userId = JSON.parse(localStorage.getItem('currentUser') || '{}').userId;
    
    return this.getUserData().pipe(
      switchMap((user) => {
        user.subscription = subscription;

        return this.http.put(`${this.apiUrl}/update/${userId}`, user).pipe(
          map((updatedUser) => {
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            return updatedUser; 
          })
        );
      })
    );
  }
}
