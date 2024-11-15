import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntructorRegistrationComponent } from './intructor-registration.component';

describe('IntructorRegistrationComponent', () => {
  let component: IntructorRegistrationComponent;
  let fixture: ComponentFixture<IntructorRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntructorRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntructorRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
