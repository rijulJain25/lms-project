import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Course, User } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {


  private coursesApiUrl = 'http://localhost:5000/api/courses/';

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.coursesApiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getCoursesByCategory(category: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.coursesApiUrl}category=${category}`);
  }

  getCourseById(courseId: string): Observable<Course> {
    return this.http.get<Course>(`${this.coursesApiUrl}${courseId}`);
  }

  getCurrentUser(): User {
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  private handleError(error: any): Observable<never> {
    console.error('API Error: ', error);
    throw error;
  }
}
