import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstCardComponent } from './inst-card.component';

describe('InstCardComponent', () => {
  let component: InstCardComponent;
  let fixture: ComponentFixture<InstCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
