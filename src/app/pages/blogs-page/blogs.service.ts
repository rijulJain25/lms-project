import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPost } from './blogs-page.component';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  private blogsUrl = 'assets/jsonFiles/blog.json';

  constructor(private http: HttpClient) { }

  getBlogs(): Observable<any> {
    return this.http.get<BlogPost[]>(this.blogsUrl);
  }
}
