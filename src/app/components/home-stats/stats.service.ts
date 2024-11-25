import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course, User } from 'src/app/auth/auth.service';
import { Instructor } from '../intructor-registration/intructor-registration.component';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  getStudents(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users/`);
  }

  getInstructor(): Observable<Instructor[]> {
    return this.http.get<Instructor[]>(`${this.apiUrl}/instructors/`);
  }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/courses/`);
  }

}
