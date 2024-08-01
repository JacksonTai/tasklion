import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TasklionAccountChangePasswordComponent} from './tasklion-account-change-password.component';

describe('TasklionAccountChangePasswordComponent', () => {
  let component: TasklionAccountChangePasswordComponent;
  let fixture: ComponentFixture<TasklionAccountChangePasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TasklionAccountChangePasswordComponent]
    });
    fixture = TestBed.createComponent(TasklionAccountChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
