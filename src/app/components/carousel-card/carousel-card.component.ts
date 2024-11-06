import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel-card',
  templateUrl: './carousel-card.component.html',
  styleUrls: ['./carousel-card.component.css']
})
export class CarouselCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() imageSrc!: string;
  @Input() title!: string;
  @Input() expertise!: string;
  @Input() experience!: number;
  @Input() reviews!: number;

}
