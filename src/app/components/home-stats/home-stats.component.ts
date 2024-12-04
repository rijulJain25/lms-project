import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Course, User } from 'src/app/auth/auth.service';
import { Instructor } from '../intructor-registration/intructor-registration.component';
import { StatsService } from './stats.service';

@Component({
  selector: 'app-home-stats',
  templateUrl: './home-stats.component.html',
  styleUrls: ['./home-stats.component.css']
})
export class HomeStatsComponent implements OnInit, AfterViewInit {

  coursesCnt: Course[] = [];
  instructorCnt: Instructor[] = [];
  studentCnt: User[] = [];
  totalCategories!: any;

  statsCount: { [key: string]: number } = {
    courses: 0,
    instructors: 0,
    students: 0,
    categories: 0
  };

  @ViewChild('coursesCard') coursesCard!: ElementRef;
  @ViewChild('instructorsCard') instructorsCard!: ElementRef;
  @ViewChild('studentsCard') studentsCard!: ElementRef;
  @ViewChild('categoriesCard') categoriesCard!: ElementRef;

  constructor(private statsService: StatsService) { }

  ngOnInit(): void {
    this.statsService.getCourses().subscribe(data => {
      this.coursesCnt = data;
      this.updateSpecializations(this.coursesCnt);
    });
    this.statsService.getInstructor().subscribe(data => {
      this.instructorCnt = data;
    });
    this.statsService.getStudents().subscribe(data => {
      this.studentCnt = data;
    });
  }

  ngAfterViewInit(): void {
    this.createIntersectionObserver();
  }

  createIntersectionObserver(): void {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cardId = entry.target.id;
          switch (cardId) {
            case 'coursesCard':
              this.startCountUp('courses', this.coursesCnt.length);
              break;
            case 'instructorsCard':
              this.startCountUp('instructors', this.instructorCnt.length);
              break;
            case 'studentsCard':
              this.startCountUp('students', this.studentCnt.length);
              break;
            case 'categoriesCard':
              this.startCountUp('categories', this.totalCategories.length);
              break;
          }
          observer.unobserve(entry.target); 
        }
      });
    }, options);

    observer.observe(this.coursesCard.nativeElement);
    observer.observe(this.instructorsCard.nativeElement);
    observer.observe(this.studentsCard.nativeElement);
    observer.observe(this.categoriesCard.nativeElement);
  }

  updateSpecializations(course: any[]) {
    const specializations = new Set<string>();
    course.forEach(crs => {
      if (crs.category) {
        specializations.add(crs.category);
      }
    });
    this.totalCategories = Array.from(specializations);
  }

  startCountUp(stat: string, target: number): void {
    let count = 0;
    const interval = setInterval(() => {
      if (count < target) {
        count++;
        this.statsCount[stat] = count;
      } else {
        clearInterval(interval);
      }
    }, 100);
  }
}
