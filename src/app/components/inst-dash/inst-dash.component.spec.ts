import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstDashComponent } from './inst-dash.component';

describe('InstDashComponent', () => {
  let component: InstDashComponent;
  let fixture: ComponentFixture<InstDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
