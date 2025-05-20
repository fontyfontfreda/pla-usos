import { TestBed } from '@angular/core/testing';

import { MantenimentService } from './manteniment.service';

describe('MantenimentService', () => {
  let service: MantenimentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MantenimentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
