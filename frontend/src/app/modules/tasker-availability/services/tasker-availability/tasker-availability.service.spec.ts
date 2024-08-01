import {TestBed} from '@angular/core/testing';

import {TaskerAvailabilityService} from './tasker-availability.service';

describe('TaskerAvailabilityService', () => {
  let service: TaskerAvailabilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskerAvailabilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
