import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPost } from './blogs-page.component';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  private blogsUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  getBlogs(): Observable<any> {
    return this.http.get<BlogPost[]>(`${this.blogsUrl}/blogs`);
  }

  addBlog(blog: BlogPost): Observable<any> {
    return this.http.post(`${this.blogsUrl}/blogs`, blog);
  }

  updateBlog(blogId: string, updatedBlog: BlogPost): Observable<any> {
    return this.http.put(`${this.blogsUrl}/blogs/${blogId}`, updatedBlog);
  }

  deleteBlog(blogId: string): Observable<any> {
    return this.http.delete(`${this.blogsUrl}/blogs/${blogId}`);
  }
}
