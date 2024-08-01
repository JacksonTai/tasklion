import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TaskerRegistrationOptionMenuComponent} from './tasker-registration-option-menu.component';

describe('TaskerRegistrationOptionMenuComponent', () => {
  let component: TaskerRegistrationOptionMenuComponent;
  let fixture: ComponentFixture<TaskerRegistrationOptionMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskerRegistrationOptionMenuComponent]
    });
    fixture = TestBed.createComponent(TaskerRegistrationOptionMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
