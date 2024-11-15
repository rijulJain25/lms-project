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

  private instUrl = "assets/jsonFile/instructor.json";

  constructor(private http: HttpClient) { }

  getInstructors() : Observable<any> {
    return this.http.get<any>(this.instUrl);
  }


}
