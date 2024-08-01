import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TaskerCreateTasklionMenuComponent} from './tasker-create-tasklion-menu.component';

describe('TaskerRegistrationFormComponent', () => {
  let component: TaskerCreateTasklionMenuComponent;
  let fixture: ComponentFixture<TaskerCreateTasklionMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskerCreateTasklionMenuComponent]
    });
    fixture = TestBed.createComponent(TaskerCreateTasklionMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
