import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopReviewInstComponent } from './top-review-inst.component';

describe('TopReviewInstComponent', () => {
  let component: TopReviewInstComponent;
  let fixture: ComponentFixture<TopReviewInstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopReviewInstComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopReviewInstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
