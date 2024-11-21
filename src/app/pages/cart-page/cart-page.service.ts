import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:5000/api/cart';

  constructor(private http: HttpClient) {}

  getCart(userId: string): Observable<any[]> {
    console.log(userId);
    
    return this.http.get<any[]>(`${this.apiUrl}/${userId}/courses`);
  }

  addCourseToCart(userId: string, courseId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${userId}`, { courseId });
  }

  removeCourseFromCart(userId: string, courseId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${userId}/remove`, {
      body: { courseId },
    });
  }

  clearCart(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${userId}/clear`);
  }

  buyCourses(userId: string, courseIds: string[]): Observable<any> {  

    return this.http.put<any>(`http://localhost:5000/api/users/${userId}`, { coursesPurchased: courseIds });
  }

  updateLocalStorageCourses(currentUser: any): void {
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }
}
