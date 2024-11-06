import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-mastering',
  templateUrl: './home-mastering.component.html',
  styleUrls: ['./home-mastering.component.css']
})
export class HomeMasteringComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  title: string = "Master the skills to drive your career";
  description: string = "Stay updated with the latest trends and skills that are essential in today’s job market. In an ever-evolving landscape, continuous learning is key to staying competitive.";
  cards = [
    {
      imageSrc: "https://dreamslms.dreamstechnologies.com/html/assets/img/icon/icon-1.svg",
      description: "Stay motivated with engaging instructors"
    },
    {
      imageSrc: "https://dreamslms.dreamstechnologies.com/html/assets/img/icon/icon-2.svg",
      description: "Keep up with in the latest in cloud"
    },
    {
      imageSrc: "https://dreamslms.dreamstechnologies.com/html/assets/img/icon/icon-3.svg",
      description: "Get certified with 100+ certification courses"
    },
    {
      imageSrc: "https://dreamslms.dreamstechnologies.com/html/assets/img/icon/icon-4.svg",
      description: "Build skills your way, from labs to courses"
    }
  ];

}
