import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TaskerUpdateAvailabilityPageComponent} from './tasker-update-availability-page.component';

describe('TaskerUpdateAvailabilityPageComponent', () => {
  let component: TaskerUpdateAvailabilityPageComponent;
  let fixture: ComponentFixture<TaskerUpdateAvailabilityPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskerUpdateAvailabilityPageComponent]
    });
    fixture = TestBed.createComponent(TaskerUpdateAvailabilityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
