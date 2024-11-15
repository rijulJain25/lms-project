import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingDashboardComponent } from './trending-dashboard.component';

describe('TrendingDashboardComponent', () => {
  let component: TrendingDashboardComponent;
  let fixture: ComponentFixture<TrendingDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrendingDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrendingDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
