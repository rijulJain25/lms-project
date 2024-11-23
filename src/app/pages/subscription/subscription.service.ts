import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  private apiUrl = 'http://localhost:5000/api/users';

  constructor(private http: HttpClient) { }

  getUserData(): Observable<any> {
    const userId = localStorage.getItem('userId');
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  updateSubscription(subscription: string): Observable<any> {
    const userId = localStorage.getItem('userId');
    return this.http.put(`${this.apiUrl}/update/${userId}`, { subscription });
  }
}
