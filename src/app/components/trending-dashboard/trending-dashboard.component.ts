import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-trending-dashboard',
  templateUrl: './trending-dashboard.component.html',
  styleUrls: ['./trending-dashboard.component.css']
})
export class TrendingDashboardComponent {
  @Input() course: any;
}
