import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TaskerManageAvailabilityListComponent} from './tasker-manage-availability-list.component';

describe('TaskerManageAvailabilityListComponent', () => {
  let component: TaskerManageAvailabilityListComponent;
  let fixture: ComponentFixture<TaskerManageAvailabilityListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskerManageAvailabilityListComponent]
    });
    fixture = TestBed.createComponent(TaskerManageAvailabilityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
