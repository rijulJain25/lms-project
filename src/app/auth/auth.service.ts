import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Instructor } from '../components/intructor-registration/intructor-registration.component';

export interface User {
  userId: string,
  name: string,
  email: string,
  password: string,
  profilePhoto: string,
  phoneNumber: string,
  purchasedCourses: string[],
  currentInstitution: string,
  gender: string,
  role: string,
  dateOfBirth: string,
  enrollmentDate: string,
  bio: string,
  interests: string[],
  location: string,
  username: string,
  subscription: string,
}

export interface Course {
    course_id:  string,
    name: string,
    category: string,
    duration:  Number,
    description:  string,
    instructor_id: any,
    img:  string,
    courseContent: [
      {
        week:Number,
        title: string,
        description: string,
      }
    ],
    prerequisites: string [],
    reviews: [
      {
        reviewer:  string,
        rating: Number,
        comment:  string
      }
    ],
    level: string,
    price:Number | any,
    faq: [
      {
        question:  string,
        answer:  string
      }
    ]
}



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/';

  constructor(private http: HttpClient, private router: Router) { }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}users`, user).pipe(
      catchError(this.handleError)
    );
  }

  registerInstructor(instructor: Instructor): Observable<Instructor> {
    return this.http.post<Instructor>(`${this.apiUrl}instructors`, instructor).pipe(
      catchError(this.handleError)
    );
  }

  login(email: string, password: string, endPointChk: string): Observable<any> {
    console.log(email, password, endPointChk);
    
    console.log(`${this.apiUrl}${endPointChk}`);

    const body = {
      email: email,
      password: password
    };
    
    return this.http.post<any>(`${this.apiUrl}${endPointChk}/loginByEmail`, body)
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  saveUserToLocalStorage(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getCurrentUser(): User {
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  private handleError(error: any): Observable<never> {
    console.error('API Error: ', error);
    throw error;
  }

  forgotPassword(email: string): Observable<{exists: boolean}> {
    return this.http.post<{exists: boolean}>(`${this.apiUrl}users/check-email`, {email: email});
  }



  updatePassword(email: string, newPassword: string): Observable<any> {
    console.log(email, newPassword);
    
    return this.http.put<any>(`${this.apiUrl}users/update-password`, {email: email, password: newPassword});
  }


  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}courses`);
  }

  getCourseCategories(): Observable<string[]> {
    return this.getCourses().pipe(
      map(courses => {
        const categories = new Set(courses.map(course => course.category));
        return Array.from(categories);
      })
    );
  }


  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<any[]>(`${this.apiUrl}users`).pipe(
      map(users => users.some(user => user.email === email)),
      catchError(() => of(false)) 
    );
  }

  updatePasswordInst(email: string, newPassword: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}instructors/update-password`, {email: email, newPassword: newPassword});
  }


  
}
