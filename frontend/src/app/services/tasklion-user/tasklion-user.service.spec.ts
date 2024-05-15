import {TestBed} from '@angular/core/testing';

import {TasklionUserService} from './tasklion-user.service';

describe('TasklionUserService', () => {
  let service: TasklionUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasklionUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
