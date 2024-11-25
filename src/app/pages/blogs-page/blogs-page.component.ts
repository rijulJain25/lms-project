import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BlogsService } from './blogs.service';
import { SnackbarService } from 'src/app/components/snackbar.service';
import { AuthService } from 'src/app/auth/auth.service';
import { BlogModalComponent } from 'src/app/components/blog-modal/blog-modal.component';
import { DeleteModalComponent } from 'src/app/components/delete-modal/delete-modal.component';

export interface BlogPost {
  blog_id: string;
  title: string;
  content: string;
  author: string;
  authorImage: string;
  date: string;
  description: string;
  category: string;
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
  currentUser: String = '';
  BlogToDelete: any;

  constructor(private blogService: BlogsService, private authService: AuthService, public dialog: MatDialog, private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser().role;

    setTimeout(() => {
      this.blogService.getBlogs().subscribe(posts => {
        this.posts = posts;
        this.filteredPosts = posts;
        this.isLoading = false;
        this.filterRecentPosts();
      });
    }, 1000); 
  }

  openAddBlogModal(blog?: BlogPost): void {
    const dialogRef = this.dialog.open(BlogModalComponent, {
      width: '800px',
      data: { blog: blog || null } 
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.blogService.getBlogs().subscribe(posts => {
          this.posts = posts;
          this.filteredPosts = posts;
          this.filterRecentPosts();
        });
      }
    });
  }
  
  
    openDeleteModal(post: any) {
      this.BlogToDelete = post;
    }

    closeModal() {
      this.BlogToDelete = null;
    }
  

  deleteBlog(blog: any): void {
    console.log(blog);
    
    this.blogService.deleteBlog(blog.blog_id).subscribe({
      next: (response) => {
        this.snackbarService.showSuccess('Blog deleted successfully!');
        // Refresh the blog list after deletion
        this.blogService.getBlogs().subscribe(posts => {
          this.posts = posts;
          this.filteredPosts = posts;
          this.closeModal();
        });
      },
      error: (error) => {
        this.snackbarService.showError('Error deleting blog');
      }
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
