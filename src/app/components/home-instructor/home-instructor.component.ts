import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-instructor',
  templateUrl: './home-instructor.component.html',
  styleUrls: ['./home-instructor.component.css']
})
export class HomeInstructorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  instructors = [
    {
      name: 'John Doe',
      imageSrc: 'assets/images/teacher1.png',
      expertise: 'Web Development',
      experience: 10,
      reviews: 4.8
    },
    {
      name: 'Jane Smith',
      imageSrc: 'assets/images/teacher2.png',
      expertise: 'Data Science',
      experience: 8,
      reviews: 4.7
    },
    {
      name: 'Alice Johnson',
      imageSrc: 'assets/images/teacher3.png',
      expertise: 'Full-Stack Development',
      experience: 7,
      reviews: 4.9
    },
    {
      name: 'Michael Brown',
      imageSrc: 'assets/images/teacher4.png',
      expertise: 'UI/UX Design',
      experience: 5,
      reviews: 4.5
    },
    {
      name: 'Emily White',
      imageSrc: 'assets/images/teacher5.png',
      expertise: 'Cybersecurity',
      experience: 6,
      reviews: 4.6
    },
    {
      name: 'Chris Green',
      imageSrc: 'assets/images/teacher3.png',
      expertise: 'Cloud Computing',
      experience: 9,
      reviews: 4.8
    }
  ];

}
