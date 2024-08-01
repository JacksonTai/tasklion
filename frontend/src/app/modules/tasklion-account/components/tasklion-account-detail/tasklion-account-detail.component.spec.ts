import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TasklionAccountDetailComponent} from './tasklion-account-detail.component';

describe('TasklionAccountDetailComponent', () => {
  let component: TasklionAccountDetailComponent;
  let fixture: ComponentFixture<TasklionAccountDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TasklionAccountDetailComponent]
    });
    fixture = TestBed.createComponent(TasklionAccountDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
