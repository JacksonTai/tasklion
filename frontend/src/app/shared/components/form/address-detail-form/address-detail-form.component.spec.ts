import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddressDetailFormComponent} from './address-detail-form.component';

describe('TaskerDetailFormComponent', () => {
  let component: AddressDetailFormComponent;
  let fixture: ComponentFixture<AddressDetailFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddressDetailFormComponent]
    });
    fixture = TestBed.createComponent(AddressDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
