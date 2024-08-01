import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UpdateTaskPageComponent} from './update-task-page.component';

describe('UpdateTaskPageComponent', () => {
  let component: UpdateTaskPageComponent;
  let fixture: ComponentFixture<UpdateTaskPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateTaskPageComponent]
    });
    fixture = TestBed.createComponent(UpdateTaskPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
