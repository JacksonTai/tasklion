import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CustomerDetailPageComponent} from './customer-detail-page.component';

describe('CustomerDetailPageComponent', () => {
  let component: CustomerDetailPageComponent;
  let fixture: ComponentFixture<CustomerDetailPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerDetailPageComponent]
    });
    fixture = TestBed.createComponent(CustomerDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
