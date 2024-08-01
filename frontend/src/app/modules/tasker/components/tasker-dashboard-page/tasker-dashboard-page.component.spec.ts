import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TaskerDashboardPageComponent} from './tasker-dashboard-page.component';

describe('TaskerDashboardPageComponent', () => {
  let component: TaskerDashboardPageComponent;
  let fixture: ComponentFixture<TaskerDashboardPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskerDashboardPageComponent]
    });
    fixture = TestBed.createComponent(TaskerDashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
