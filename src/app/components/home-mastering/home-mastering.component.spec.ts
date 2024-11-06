import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMasteringComponent } from './home-mastering.component';

describe('HomeMasteringComponent', () => {
  let component: HomeMasteringComponent;
  let fixture: ComponentFixture<HomeMasteringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeMasteringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeMasteringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
