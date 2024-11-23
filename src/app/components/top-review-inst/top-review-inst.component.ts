import { Component, OnInit } from '@angular/core';
import { Chart, ArcElement, Tooltip, Legend, CategoryScale, Title, PieController } from 'chart.js';
import { HttpClient } from '@angular/common/http';


Chart.register(ArcElement, Tooltip, Legend, CategoryScale, Title, PieController);

@Component({
  selector: 'app-top-review-inst',
  templateUrl: './top-review-inst.component.html',
  styleUrls: ['./top-review-inst.component.css']
})
export class TopReviewInstComponent implements OnInit {
  chart: any;  // Reference for the chart
  instructors: any[] = [];  // Array to store the instructor data
  reviewCounts: any = {
    fiveStars: 0,
    threeToFiveStars: 0,
    lessThanThreeStars: 0
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchInstructors();  // Fetch all instructors when component initializes
  }

  // Fetch all instructors from the backend
  fetchInstructors() {
    this.http.get<any[]>('http://localhost:5000/api/instructors').subscribe((data) => {
      this.instructors = data;  // Store instructors data
      this.processReviewData();  // Process review data to categorize the instructors
    });
  }

  // Process the instructors' review data to classify them into the three categories
  processReviewData() {
    this.reviewCounts = {
      fiveStars: 0,
      threeToFiveStars: 0,
      lessThanThreeStars: 0
    };

    // Loop through all instructors and classify based on their review score
    this.instructors.forEach(instructor => {
      const review = instructor.reviewIns;
      if (review === 5) {
        this.reviewCounts.fiveStars++;
      } else if (review >= 3 && review < 5) {
        this.reviewCounts.threeToFiveStars++;
      } else if (review < 3) {
        this.reviewCounts.lessThanThreeStars++;
      }
    });

    // Create the pie chart after processing the data
    this.createChart();
  }

  // Create the pie chart using Chart.js
  createChart() {
    const labels = ['5 Stars', '3 to 5 Stars', 'Less than 3 Stars'];
    const data = [
      this.reviewCounts.fiveStars,
      this.reviewCounts.threeToFiveStars,
      this.reviewCounts.lessThanThreeStars
    ];

    // Create the pie chart
    this.chart = new Chart('reviewChart', {
      type: 'pie',  // Pie chart type
      data: {
        labels: labels,  // Labels for the pie slices
        datasets: [{
          label: 'Instructor Reviews',
          data: data,  // Data for the pie chart
          backgroundColor: ['#36a2eb', '#ffcd56', '#ff6384'],  // Slice colors
          hoverBackgroundColor: ['#36a2eb', '#ffcd56', '#ff6384']  // Hover colors
        }]
      },
      options: {
        responsive: true,  // Make the chart responsive
        plugins: {
          legend: {
            position: 'top',  // Position of the legend
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                return tooltipItem.label + ': ' + tooltipItem.raw + ' instructors';  // Format the tooltip label
              }
            }
          }
        }
      }
    });
  }
}
