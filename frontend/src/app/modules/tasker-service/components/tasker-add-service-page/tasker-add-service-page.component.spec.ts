import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TaskerAddServicePageComponent} from './tasker-add-service-page.component';

describe('TaskerAddServicePageComponent', () => {
  let component: TaskerAddServicePageComponent;
  let fixture: ComponentFixture<TaskerAddServicePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskerAddServicePageComponent]
    });
    fixture = TestBed.createComponent(TaskerAddServicePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
