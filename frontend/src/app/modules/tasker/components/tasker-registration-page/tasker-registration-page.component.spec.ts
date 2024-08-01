import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TaskerRegistrationPageComponent} from './tasker-registration-page.component';

describe('TaskerRegistrationPageComponent', () => {
  let component: TaskerRegistrationPageComponent;
  let fixture: ComponentFixture<TaskerRegistrationPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskerRegistrationPageComponent]
    });
    fixture = TestBed.createComponent(TaskerRegistrationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
