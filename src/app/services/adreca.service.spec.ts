import { TestBed } from '@angular/core/testing';

import { AdrecaService } from './adreca.service';

describe('AdrecaService', () => {
  let service: AdrecaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdrecaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
