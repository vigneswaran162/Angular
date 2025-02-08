import { TestBed } from '@angular/core/testing';

import { TotastService } from './totast.service';

describe('TotastService', () => {
  let service: TotastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TotastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
