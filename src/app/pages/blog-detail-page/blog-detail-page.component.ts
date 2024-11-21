import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogsService } from '../blogs-page/blogs.service';
import { BlogPost } from '../blogs-page/blogs-page.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-blog-detail-page',
  templateUrl: './blog-detail-page.component.html',
  styleUrls: ['./blog-detail-page.component.css']
})
export class BlogDetailPageComponent implements OnInit {
  blogPost: BlogPost | undefined;
  isLoading: boolean = true;
  recentPosts: BlogPost[] = [];
  posts: BlogPost[] = [];
  routeSub: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogsService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe(params => {
      console.log(params);
      
      console.log(params.get('id')! + "");
      const blogId: string = params.get('id')! + "";
      this.fetchBlogPostData(blogId);
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }


  fetchBlogPostData(blogId: string): void {
    this.blogService.getBlogs().subscribe(posts => {
      this.posts = posts;
      this.blogPost = posts.find((post: { blog_id: string; }) => post.blog_id === blogId);
      this.filterRecentPosts();
      this.isLoading = false;
    });
  }

  filterRecentPosts(): void {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    this.recentPosts = this.posts.filter(post => {
      const postDate = new Date(post.date);
      return postDate >= oneMonthAgo;
    });
  }
}
