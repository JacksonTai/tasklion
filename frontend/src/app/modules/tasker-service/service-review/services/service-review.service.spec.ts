import {TestBed} from '@angular/core/testing';

import {ServiceReviewService} from './service-review.service';

describe('ServiceReviewService', () => {
  let service: ServiceReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
