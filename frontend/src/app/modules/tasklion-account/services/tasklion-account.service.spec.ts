import {TestBed} from '@angular/core/testing';

import {TasklionAccountService} from './tasklion-account.service';

describe('TasklionAccountService', () => {
  let service: TasklionAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasklionAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
