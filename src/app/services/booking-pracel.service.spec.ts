import { TestBed } from '@angular/core/testing';

import { BookingPracelService } from './booking-pracel.service';

describe('BookingPracelService', () => {
  let service: BookingPracelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingPracelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
