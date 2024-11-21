import { Injectable } from '@angular/core';
import { Instructor } from '../intructor-registration/intructor-registration.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {

  private url = 'http://localhost:5000/api/instructors'

  constructor(private http: HttpClient) { }

  GetInstructors(instId: string) : Observable<Instructor> {
    return this.http.get<Instructor>(`${this.url}/${instId}`);
  }

  
}
