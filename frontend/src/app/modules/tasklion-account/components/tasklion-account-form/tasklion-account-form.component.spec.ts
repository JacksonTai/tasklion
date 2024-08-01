import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TasklionAccountFormComponent} from './tasklion-account-form.component';

describe('TasklionAccountFormComponent', () => {
  let component: TasklionAccountFormComponent;
  let fixture: ComponentFixture<TasklionAccountFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TasklionAccountFormComponent]
    });
    fixture = TestBed.createComponent(TasklionAccountFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
