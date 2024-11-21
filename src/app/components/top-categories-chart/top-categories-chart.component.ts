import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Chart, CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components
Chart.register(
  CategoryScale, 
  LinearScale, 
  BarController, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend
);

@Component({
  selector: 'app-top-categories-chart',
  templateUrl: './top-categories-chart.component.html',
  styleUrls: ['./top-categories-chart.component.css']
})
export class TopCategoriesChartComponent {
  chart: any;  
  courses: any[] = []; 
  topCategories: any[] = []; 

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchCourses(); 
  }

  fetchCourses() {
    this.http.get<any[]>('http://localhost:5000/api/courses').subscribe((data) => {
      this.courses = data;  
      this.processCategories();  
    });
  }

  processCategories() {
    const categoryCounts: { [key: string]: number } = {};

    this.courses.forEach(course => {
      if (categoryCounts[course.category]) {
        categoryCounts[course.category]++;
      } else {
        categoryCounts[course.category] = 1;
      }
    });

    console.log(categoryCounts);
    
    const categoryArray = Object.keys(categoryCounts).map(category => ({
      category,
      count: categoryCounts[category]
    }));

    this.topCategories = categoryArray
      .sort((a, b) => b.count - a.count)  // Sort in descending order
      .slice(0, 7);  // Get the top 7 categories

    console.log(this.topCategories);
    
    this.createChart();
  }

  createChart() {
    const categories = this.topCategories.map(item => item.category);  
    const counts = this.topCategories.map(item => item.count); 

    this.chart = new Chart('canvas', {
      type: 'bar',  // Bar chart
      data: {
        labels: categories,  
        datasets: [{
          label: 'Number of Courses', 
          data: counts, 
          backgroundColor: '#f86c64', 
          borderColor: '#f86c64',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true  
          }
        }
      }
    });
  }
}
