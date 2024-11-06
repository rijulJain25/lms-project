import { Component, OnInit } from '@angular/core';
import { BlogsService } from './blogs.service';

interface BlogPost {
  title: string;
  content: string;
  author: string;
  date: Date;
  description: string;
  images: string[];
}

@Component({
  selector: 'app-blogs-page',
  templateUrl: './blogs-page.component.html',
  styleUrls: ['./blogs-page.component.css']
})
export class BlogsPageComponent implements OnInit {  

  posts: BlogPost[] = []; 
  filteredPosts: BlogPost[] = [];
  recentPosts: BlogPost[] = []; // To store the recent posts
  searchTerm: string = '';
  pageIndex: number = 0;
  pageSize: number = 5; 
  isLoading: boolean = true;

  constructor(private blogService: BlogsService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.blogService.getBlogs().subscribe(posts => {
        this.posts = posts;
        this.filteredPosts = posts;
        this.isLoading = false;
        this.filterRecentPosts();
      });
    }, 3000); 
  }

  filterRecentPosts(): void {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1); 

    this.recentPosts = this.posts.filter(post => {
      const postDate = new Date(post.date);
      return postDate >= oneMonthAgo; 
    });
  }

  searchPosts(): void {
    if (this.searchTerm) {
      this.filteredPosts = this.posts.filter(post => 
        post.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredPosts = this.posts;
    }
  }

  get paginatedPosts(): BlogPost[] {
    const startIndex = this.pageIndex * this.pageSize;
    return this.filteredPosts.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(event: any): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }
}
