import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TaskerLoginPageComponent} from './tasker-login-page.component';

describe('TaskerLoginPageComponent', () => {
  let component: TaskerLoginPageComponent;
  let fixture: ComponentFixture<TaskerLoginPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskerLoginPageComponent]
    });
    fixture = TestBed.createComponent(TaskerLoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
