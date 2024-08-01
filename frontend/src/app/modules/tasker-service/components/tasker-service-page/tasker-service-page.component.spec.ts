import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TaskerServicePageComponent} from './tasker-service-page.component';

describe('TaskerServicePageComponent', () => {
  let component: TaskerServicePageComponent;
  let fixture: ComponentFixture<TaskerServicePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskerServicePageComponent]
    });
    fixture = TestBed.createComponent(TaskerServicePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
