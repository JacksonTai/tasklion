import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TaskerDetailFormComponent} from './tasker-detail-form.component';

describe('TaskerDetailFormComponent', () => {
  let component: TaskerDetailFormComponent;
  let fixture: ComponentFixture<TaskerDetailFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskerDetailFormComponent]
    });
    fixture = TestBed.createComponent(TaskerDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
