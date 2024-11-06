import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTrendingCourseComponent } from './home-trending-course.component';

describe('HomeTrendingCourseComponent', () => {
  let component: HomeTrendingCourseComponent;
  let fixture: ComponentFixture<HomeTrendingCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeTrendingCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTrendingCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
