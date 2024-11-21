import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/components/snackbar.service';
import { BlogsService } from 'src/app/pages/blogs-page/blogs.service';
import { BlogPost } from 'src/app/pages/blogs-page/blogs-page.component';

@Component({
  selector: 'app-blog-modal',
  templateUrl: './blog-modal.component.html',
  styleUrls: ['./blog-modal.component.css']
})
export class BlogModalComponent implements OnInit {
  blogForm!: FormGroup;
  isEditMode: boolean = false;  // To track if we are in edit mode or add mode
  blogData: BlogPost | null = null;  // Store the blog data if editing

  constructor(
    private fb: FormBuilder,
    private blogsService: BlogsService,
    private snackbarService: SnackbarService,
    public dialogRef: MatDialogRef<BlogModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { blog: BlogPost | null }
  ) {
    this.blogData = data.blog;
  }

  ngOnInit(): void {
    // If there's blog data, we are in edit mode
    if (this.blogData) {
      this.isEditMode = true;
      this.blogForm = this.fb.group({
        title: [this.blogData.title, Validators.required],
        content: [this.blogData.content, Validators.required],
        author: [this.blogData.author, Validators.required],
        description: [this.blogData.description, Validators.required],
        category: [this.blogData.category, Validators.required],
        images: [this.blogData.images || '']
      });
    } else {
      // If no blog data, we are in add mode
      this.isEditMode = false;
      this.blogForm = this.fb.group({
        title: ['', Validators.required],
        content: ['', Validators.required],
        author: ['', Validators.required],
        description: ['', Validators.required],
        category: ['', Validators.required],
        images: ['']
      });
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.blogForm.invalid) {
      return;
    }

    const blog = this.blogForm.value;
    blog.date = new Date(); // set the current date

    if (this.isEditMode && this.blogData) {
      // Update the existing blog
      this.blogsService.updateBlog(this.blogData.blog_id, blog).subscribe({
        next: (res) => {
          this.snackbarService.showSuccess('Blog updated successfully!');
          this.dialogRef.close(true); // Close the modal after saving
        },
        error: (err) => {
          this.snackbarService.showError('Error updating blog');
        }
      });
    } else {
      // Add new blog
      this.blogsService.addBlog(blog).subscribe({
        next: (res) => {
          this.snackbarService.showSuccess('Blog added successfully!');
          this.dialogRef.close(true); // Close the modal after saving
        },
        error: (err) => {
          this.snackbarService.showError('Error adding blog');
        }
      });
    }
  }
}
