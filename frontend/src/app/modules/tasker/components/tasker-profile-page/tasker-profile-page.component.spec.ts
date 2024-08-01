import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TaskerProfilePageComponent} from './tasker-profile-page.component';

describe('TaskerProfilePageComponent', () => {
  let component: TaskerProfilePageComponent;
  let fixture: ComponentFixture<TaskerProfilePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskerProfilePageComponent]
    });
    fixture = TestBed.createComponent(TaskerProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
