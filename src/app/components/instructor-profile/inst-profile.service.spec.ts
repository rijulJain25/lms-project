import { TestBed } from '@angular/core/testing';

import { InstProfileService } from './inst-profile.service';

describe('InstProfileService', () => {
  let service: InstProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
