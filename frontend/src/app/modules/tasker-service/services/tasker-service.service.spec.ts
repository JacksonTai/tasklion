import {TestBed} from '@angular/core/testing';

import {TaskerServiceService} from './tasker-service.service';

describe('TaskerServiceService', () => {
  let service: TaskerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
