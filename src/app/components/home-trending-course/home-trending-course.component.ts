import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-trending-course',
  templateUrl: './home-trending-course.component.html',
  styleUrls: ['./home-trending-course.component.css']
})
export class HomeTrendingCourseComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  courses: any[] = [
    {
        title: 'Introduction to Angular Application',
        img: 'assets/images/angular.png',
        instructor: {
            name: 'John Doe',
            image: 'assets/images/teacher3.png',
        },
        numberOfLessons: 25,
        duration: '6 months',
        reviews: {
            rating: 4.5,
            count: 200
        },
        price: 199.99
    },
    {
        title: 'React JS- Begineer to Advanced',
        img: 'assets/images/reactjs.png',
        instructor: {
            name: 'Jane Smith',
            image: 'assets/images/teacher3.png'
        },
        numberOfLessons: 20,
        duration: '4 months',
        reviews: {
            rating: 4.7,
            count: 150
        },
        price: 149.99
    },
    {
        title: 'Node.js Basics to Advanced Course',
        img: 'assets/images/node.png',
        instructor: {
            name: 'Alice Johnson',
            image: 'assets/images/teacher3.png'
        },
        numberOfLessons: 18,
        duration: '5 months',
        reviews: {
            rating: 4.3,
            count: 100
        },
        price: 129.99
    },
    {
        title: 'Mastering Python- with best practices',
        img: 'assets/images/python.png',
        instructor: {
            name: 'Michael Brown',
            image: 'assets/images/teacher3.png'
        },
        numberOfLessons: 30,
        duration: '8 months',
        reviews: {
            rating: 4.8,
            count: 250
        },
        price: 249.99
    },
    {
        title: 'Data Science with R, Scripting and More',
        img: 'assets/images/data.png',
        instructor: {
            name: 'Emily White',
            image: 'assets/images/teacher3.png'
        },
        numberOfLessons: 22,
        duration: '7 months',
        reviews: {
            rating: 4.6,
            count: 180
        },
        price: 199.99
    },
    {
        title: 'UI/UX Design Fundamentals',
        img: 'assets/images/ui.png',
        instructor: {
            name: 'Chris Green',
            image: 'assets/images/teacher3.png'
        },
        numberOfLessons: 15,
        duration: '3 months',
        reviews: {
            rating: 4.4,
            count: 120
        },
        price: 99.99
    }
];

}
