import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface InstructorBody{
  id: number;
  name: string;
  image: string;
  reviews: number;
  numberOfReviewers: number;
  numberOfLessons: number;
  duration:string;
  email:string;
  password:string;
  experience:string;
  specilization: string;
  bio: string;
  location:string;
  socialLinks: any;
  totalCoursesTaught: number,
  availbleForHire: number;
}

@Injectable({
  providedIn: 'root'
})
export class InstructorService {

  private instUrl = "http://localhost:5000/api";

  constructor(private http: HttpClient) { }

  getInstructors() : Observable<any> {
    return this.http.get<any>(`${this.instUrl}/instructors`);
  }

  getCourses(): Observable<any> {
    return this.http.get<any>(`${this.instUrl}/courses`);
  }

  addInstructor(instructor: any): Observable<any> {
    return this.http.post<any>(`${this.instUrl}/instructors`, instructor);
  } 

  updateInstructor(id: string, instructor: any): Observable<any> {
    return this.http.put<any>(`${this.instUrl}/instructors/${id}`, instructor);
  }

  deleteInstructor(instructorId: number): Observable<any> {
    return this.http.delete(`${this.instUrl}/instructors/${instructorId}`);
  }


}
