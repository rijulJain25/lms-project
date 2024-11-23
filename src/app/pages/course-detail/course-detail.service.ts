import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseDetailService {

  private apiUrl = 'http://localhost:5000/api/';

  constructor(private http: HttpClient) { }

  getCourseById(courseId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}courses/${courseId}`);
  }


  getInstructor(instId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}instructors/${instId}`);
  }

  updateCourse(courseId: string, courseData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}courses/${courseId}`, courseData);
  }

  deleteService(courseid: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}courses/${courseid}`);

  }

}
