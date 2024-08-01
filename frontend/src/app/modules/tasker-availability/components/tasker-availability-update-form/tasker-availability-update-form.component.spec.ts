import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TaskerAvailabilityUpdateFormComponent} from './tasker-availability-update-form.component';

describe('TaskerAvailabilityUpdateFormComponent', () => {
  let component: TaskerAvailabilityUpdateFormComponent;
  let fixture: ComponentFixture<TaskerAvailabilityUpdateFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskerAvailabilityUpdateFormComponent]
    });
    fixture = TestBed.createComponent(TaskerAvailabilityUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
