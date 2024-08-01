import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BookingConfirmationPageComponent} from './booking-confirmation-page.component';

describe('BookingConfirmationPageComponent', () => {
  let component: BookingConfirmationPageComponent;
  let fixture: ComponentFixture<BookingConfirmationPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookingConfirmationPageComponent]
    });
    fixture = TestBed.createComponent(BookingConfirmationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
