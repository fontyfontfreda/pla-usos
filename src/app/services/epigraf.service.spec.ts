import { TestBed } from '@angular/core/testing';

import { EpigrafService } from './epigraf.service';

describe('EpigrafService', () => {
  let service: EpigrafService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EpigrafService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
