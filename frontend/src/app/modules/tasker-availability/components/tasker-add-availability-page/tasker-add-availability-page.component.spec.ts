import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TaskerAddAvailabilityPageComponent} from './tasker-add-availability-page.component';

describe('TaskerAddAvailabilityPageComponent', () => {
  let component: TaskerAddAvailabilityPageComponent;
  let fixture: ComponentFixture<TaskerAddAvailabilityPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskerAddAvailabilityPageComponent]
    });
    fixture = TestBed.createComponent(TaskerAddAvailabilityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
