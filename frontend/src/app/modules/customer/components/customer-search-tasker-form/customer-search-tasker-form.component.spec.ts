import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CustomerSearchTaskerFormComponent} from './customer-search-tasker-form.component';

describe('CustomerSearchTaskerFormComponent', () => {
  let component: CustomerSearchTaskerFormComponent;
  let fixture: ComponentFixture<CustomerSearchTaskerFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerSearchTaskerFormComponent]
    });
    fixture = TestBed.createComponent(CustomerSearchTaskerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
