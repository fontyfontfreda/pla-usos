import { TestBed } from '@angular/core/testing';

import { ConfiguracioService } from './configuracio.service';

describe('ConfiguracioService', () => {
  let service: ConfiguracioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfiguracioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
