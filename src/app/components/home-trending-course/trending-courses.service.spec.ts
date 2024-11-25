import { TestBed } from '@angular/core/testing';

import { TrendingCoursesService } from './trending-courses.service';

describe('TrendingCoursesService', () => {
  let service: TrendingCoursesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrendingCoursesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
