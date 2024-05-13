import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ErrorFieldComponent} from './error-field.component';

describe('ErrorFieldTestComponent', () => {
  let component: ErrorFieldComponent;
  let fixture: ComponentFixture<ErrorFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorFieldComponent]
    });
    fixture = TestBed.createComponent(ErrorFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
