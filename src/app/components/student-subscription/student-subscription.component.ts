import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { StudentService } from './student.service';


@Component({
  selector: 'app-student-subscription',
  templateUrl: './student-subscription.component.html',
  styleUrls: ['./student-subscription.component.css']
})
export class StudentSubscriptionComponent {
  chart: any;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.studentService.getStudents().subscribe((students) => {
      this.createChart(students);
    });
  }

  createChart(students: any[]): void {
    const subscriptionCounts = students.reduce((acc, student) => {
      const subscription = student.subscription;
      if (subscription === 'Free') {
        acc.Free = acc.Free ? acc.Free + 1 : 1;
      } else if (subscription === 'Basic') {
        acc.Basic = acc.Basic ? acc.Basic + 1 : 1;
      } else if (subscription === 'Premium') {
        acc.Premium = acc.Premium ? acc.Premium + 1 : 1;
      }
      return acc;
    }, { Free: 0, Basic: 0, Premium: 0 });

    const labels = ['Free', 'Basic', 'Premium'];
    const data = [subscriptionCounts.Free, subscriptionCounts.Basic, subscriptionCounts.Premium];

    this.chart = new Chart('subscriptionChart', {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          label: 'Subscription Types',
          data: data,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                const percentage: any = tooltipItem.raw;
                return `${tooltipItem.label}: ${percentage} students (${Math.round((percentage / students.length) * 100)}%)`;
              }
            }
          }
        }
      }
    });
  }
}
