import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel-card',
  templateUrl: './carousel-card.component.html',
  styleUrls: ['./carousel-card.component.css']
})
export class CarouselCardComponent implements OnInit {

  constructor() { }

  @Input() course: any;


  ngOnInit(): void {
    console.log("my data", this.course);
    
  }
}
