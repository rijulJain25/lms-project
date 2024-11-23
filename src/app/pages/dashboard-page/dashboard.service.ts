import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Course, User } from 'src/app/auth/auth.service';
import { Instructor } from 'src/app/components/intructor-registration/intructor-registration.component';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {


  private coursesApiUrl = 'http://localhost:5000/api/courses/';

  constructor(private http: HttpClient) {}

  getStudent(): Observable<User[]> {
    return this.http.get<User[]>("http://localhost:5000/api/users").pipe(catchError(this.handleError));
  }

  deleteStudent(id: string): Observable<void> {
    return this.http.delete<void>(`http://localhost:5000/api/users/${id}`).pipe(catchError(this.handleError));
  }

  createStudent(studentData: User): Observable<User> {
    return this.http.post<User>("http://localhost:5000/api/users/", studentData).pipe(catchError(this.handleError));
  }

  updateStudent(id: string, studentData: User): Observable<User> {
    return this.http.put<User>(`http://localhost:5000/api/users/update/${id}`, studentData).pipe(catchError(this.handleError));
  }

  getInstructor(): Observable<Instructor> {
    return this.http.get<Instructor>('http://localhost:5000/api/instructors/');
  }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.coursesApiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getStudentById(id: string): Observable<User> {
    return this.http.get<User>(`http://localhost:5000/api/users/${id}`).pipe(catchError(this.handleError));
  }

  getCoursesByCategory(category: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.coursesApiUrl}category/${category}`);
  }

  getCourseById(courseId: string): Observable<Course> {
    return this.http.get<Course>(`${this.coursesApiUrl}${courseId}`);
  }

  getCurrentUserData(): Observable<User> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    if (!currentUser || !currentUser.role) {
      throw new Error('No current user or role found in localStorage');
    }
    
    let apiUrl: string;
    
    if (currentUser.role === 'Instructor') {
      apiUrl = `http://localhost:5000/api/instructors/${currentUser.instructorId}`;
    } else {
      apiUrl = `http://localhost:5000/api/users/${currentUser.userId}`;
    }
  
    console.log("Fetching data from:", apiUrl);
  
    return this.http.get<User>(apiUrl);
  }

  getInstructCourses(instId: string) {
    
  }
  

  private handleError(error: any): Observable<never> {
    console.error('API Error: ', error);
    throw error;
  }

  addCourse(course: any): Observable<any> {
    return this.http.post<any>(`${this.coursesApiUrl}`, course);
  }
}
