import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TrendingCoursesService {
  private apiUrl = 'http://localhost:5000/api'; 

  constructor(private http: HttpClient) {}

  getTrendingCourses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`).pipe(
      map((users: any[]) => {
        const courseCountMap: { [key: string]: number } = {};

        users.forEach((user) => {
          user.purchasedCourses.forEach((courseId: string) => {
            if (courseCountMap[courseId]) {
              courseCountMap[courseId]++;
            } else {
              courseCountMap[courseId] = 1;
            }
          });
        });

        const coursesArray = Object.entries(courseCountMap).map(([courseId, count]) => ({
          courseId,
          count,
        }));

        coursesArray.sort((a, b) => b.count - a.count);

        return coursesArray.slice(0, 6);
      })
    );
  }

  getCourseDetails(courseIds: string[]): Observable<any[]> {
    const courseRequests = courseIds.map((courseId) =>
      this.http.get<any>(`${this.apiUrl}/courses/${courseId}`)
    );
    
    return forkJoin(courseRequests);
  }
}
