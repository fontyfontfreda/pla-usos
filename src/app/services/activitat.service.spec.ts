import { TestBed } from '@angular/core/testing';

import { ActivitatService } from './activitat.service';

describe('ActivitatService', () => {
  let service: ActivitatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivitatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
