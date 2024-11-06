import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-testimonial',
  templateUrl: './home-testimonial.component.html',
  styleUrls: ['./home-testimonial.component.css']
})
export class HomeTestimonialComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  currentIndex = 0;

  testimonials = [
    {
      review: 'This platform transformed my learning experience!',
      author: 'Jane Doe',
      image: 'https://example.com/jane.jpg' 
    },
    {
      review: 'Instructors are incredibly knowledgeable and supportive.',
      author: 'John Smith',
      image: 'https://example.com/john.jpg' 
    },
    {
      review: 'I love the interactive learning approach!',
      author: 'Alice Johnson',
      image: 'https://example.com/alice.jpg' 
    },
    {
      review: 'The community here is amazing!',
      author: 'Michael Brown',
      image: 'https://example.com/michael.jpg' // Replace with actual image URL
    },
  ];

}
