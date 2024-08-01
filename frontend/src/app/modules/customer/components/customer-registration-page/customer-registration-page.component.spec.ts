import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CustomerRegistrationPageComponent} from './customer-registration-page.component';

describe('CustomerRegistrationPageComponent', () => {
  let component: CustomerRegistrationPageComponent;
  let fixture: ComponentFixture<CustomerRegistrationPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerRegistrationPageComponent]
    });
    fixture = TestBed.createComponent(CustomerRegistrationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
