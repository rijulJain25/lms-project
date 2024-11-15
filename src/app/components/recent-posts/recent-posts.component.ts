import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogPost } from 'src/app/pages/blogs-page/blogs-page.component';

@Component({
  selector: 'app-recent-posts',
  templateUrl: './recent-posts.component.html',
  styleUrls: ['./recent-posts.component.css']
})
export class RecentPostsComponent implements OnInit {
  @Input() recentPosts: BlogPost[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log(this.recentPosts);
  }

  NavigateFunc(postId: string): void {
    this.router.navigate(['/blog', postId]);
  }
}
