import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-video',
  templateUrl: './home-video.component.html',
  styleUrls: ['./home-video.component.css']
})
export class HomeVideoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  videoUrl = 'assets/video1.mp4';

}
