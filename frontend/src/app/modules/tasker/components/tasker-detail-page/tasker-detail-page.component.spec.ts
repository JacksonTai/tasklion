import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TaskerDetailPageComponent} from './tasker-detail-page.component';

describe('TaskerDetailPageComponent', () => {
  let component: TaskerDetailPageComponent;
  let fixture: ComponentFixture<TaskerDetailPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskerDetailPageComponent]
    });
    fixture = TestBed.createComponent(TaskerDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
