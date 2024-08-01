import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TaskerContinueTasklionMenuComponent} from './tasker-continue-tasklion-menu.component';

describe('TaskerContinueTasklionMenuComponent', () => {
  let component: TaskerContinueTasklionMenuComponent;
  let fixture: ComponentFixture<TaskerContinueTasklionMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskerContinueTasklionMenuComponent]
    });
    fixture = TestBed.createComponent(TaskerContinueTasklionMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
