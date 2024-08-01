import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TaskerServiceDetailComponent} from './tasker-service-detail.component';

describe('TaskerServiceDetailComponent', () => {
  let component: TaskerServiceDetailComponent;
  let fixture: ComponentFixture<TaskerServiceDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskerServiceDetailComponent]
    });
    fixture = TestBed.createComponent(TaskerServiceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
