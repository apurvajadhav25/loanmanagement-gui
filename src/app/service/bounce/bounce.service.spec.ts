import { TestBed } from '@angular/core/testing';

import { BounceService } from './bounce.service';

describe('BounceService', () => {
  let service: BounceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BounceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
