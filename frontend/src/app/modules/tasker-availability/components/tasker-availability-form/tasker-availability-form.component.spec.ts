import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TaskerAvailabilityFormComponent} from './tasker-availability-form.component';

describe('TaskerAvailabilityFormComponent', () => {
  let component: TaskerAvailabilityFormComponent;
  let fixture: ComponentFixture<TaskerAvailabilityFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskerAvailabilityFormComponent]
    });
    fixture = TestBed.createComponent(TaskerAvailabilityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
