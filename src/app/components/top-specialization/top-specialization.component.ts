import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip, Legend } from 'chart.js';

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
  selector: 'app-top-specialization',
  templateUrl: './top-specialization.component.html',
  styleUrls: ['./top-specialization.component.css']
})
export class TopSpecializationComponent {

  chart: any;  
  instructors: any[] = [];
  specializationCounts: any[] = []; 

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchInstructors();  
  }

  fetchInstructors() {
    this.http.get<any[]>('http://localhost:5000/api/instructors').subscribe((data) => {
      this.instructors = data;
      console.log("gogogo",this.instructors);
      
      this.processSpecializations();
    });
  }

  processSpecializations() {
    const specializationCounts: { [key: string]: number } = {};

    this.instructors.forEach(instructor => {
      const specialization = instructor.specialization;
      if (specializationCounts[specialization]) {
        specializationCounts[specialization]++;
      } else {
        specializationCounts[specialization] = 1;
      }
    });

    this.specializationCounts = Object.keys(specializationCounts).map(key => ({
      specialization: key,
      count: specializationCounts[key]
    }));

    this.specializationCounts = this.specializationCounts
      .sort((a, b) => b.count - a.count)  
      .slice(0, 7);  

    this.createChart();
  }

  createChart() {
    const specializations = this.specializationCounts.map(item => item.specialization);
    const counts = this.specializationCounts.map(item => item.count);

    this.chart = new Chart('specializationChart', {
      type: 'bar', 
      data: {
        labels: specializations, 
        datasets: [{
          label: 'Number of Instructors',  
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
