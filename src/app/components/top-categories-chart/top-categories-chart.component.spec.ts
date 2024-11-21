import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopCategoriesChartComponent } from './top-categories-chart.component';

describe('TopCategoriesChartComponent', () => {
  let component: TopCategoriesChartComponent;
  let fixture: ComponentFixture<TopCategoriesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopCategoriesChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopCategoriesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
