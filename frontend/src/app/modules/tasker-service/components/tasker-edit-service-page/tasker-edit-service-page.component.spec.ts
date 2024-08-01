import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TaskerEditServicePageComponent} from './tasker-edit-service-page.component';

describe('TaskerEditServicePageComponent', () => {
  let component: TaskerEditServicePageComponent;
  let fixture: ComponentFixture<TaskerEditServicePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskerEditServicePageComponent]
    });
    fixture = TestBed.createComponent(TaskerEditServicePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
