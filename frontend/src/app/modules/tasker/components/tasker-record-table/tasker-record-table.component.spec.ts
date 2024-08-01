import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TaskerRecordTableComponent} from './tasker-record-table.component';

describe('TaskerRecordTableComponent', () => {
  let component: TaskerRecordTableComponent;
  let fixture: ComponentFixture<TaskerRecordTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskerRecordTableComponent]
    });
    fixture = TestBed.createComponent(TaskerRecordTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
