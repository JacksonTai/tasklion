import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TaskerAvailabilityPageComponent} from './tasker-availability-page.component';

describe('TaskerAvailabilityPageComponent', () => {
  let component: TaskerAvailabilityPageComponent;
  let fixture: ComponentFixture<TaskerAvailabilityPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskerAvailabilityPageComponent]
    });
    fixture = TestBed.createComponent(TaskerAvailabilityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
