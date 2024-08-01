import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BookingTaskerPageComponent} from './booking-tasker-page.component';

describe('BookingTaskerPageComponent', () => {
  let component: BookingTaskerPageComponent;
  let fixture: ComponentFixture<BookingTaskerPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookingTaskerPageComponent]
    });
    fixture = TestBed.createComponent(BookingTaskerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
