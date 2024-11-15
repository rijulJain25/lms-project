import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllCoursesService {
  private apiUrl = 'assets/jsonFiles/course.json';

  constructor(private http: HttpClient) { }

  getCourses(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}

