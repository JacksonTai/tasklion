import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CustomerRecordTableComponent} from './customer-record-table.component';

describe('CustomerRecordTableComponent', () => {
  let component: CustomerRecordTableComponent;
  let fixture: ComponentFixture<CustomerRecordTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerRecordTableComponent]
    });
    fixture = TestBed.createComponent(CustomerRecordTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
