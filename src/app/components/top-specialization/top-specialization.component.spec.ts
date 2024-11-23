import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSpecializationComponent } from './top-specialization.component';

describe('TopSpecializationComponent', () => {
  let component: TopSpecializationComponent;
  let fixture: ComponentFixture<TopSpecializationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopSpecializationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopSpecializationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
