import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TaskerServiceListComponent} from './tasker-service-list.component';

describe('TaskerServiceListComponent', () => {
  let component: TaskerServiceListComponent;
  let fixture: ComponentFixture<TaskerServiceListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskerServiceListComponent]
    });
    fixture = TestBed.createComponent(TaskerServiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
