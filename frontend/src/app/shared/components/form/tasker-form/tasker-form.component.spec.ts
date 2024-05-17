import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TaskerFormComponent} from './tasker-form.component';

describe('TaskerFormComponent', () => {
  let component: TaskerFormComponent;
  let fixture: ComponentFixture<TaskerFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskerFormComponent]
    });
    fixture = TestBed.createComponent(TaskerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
