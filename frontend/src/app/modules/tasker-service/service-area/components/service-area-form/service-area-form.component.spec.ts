import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ServiceAreaFormComponent} from './service-area-form.component';

describe('ServiceAreaFormComponent', () => {
  let component: ServiceAreaFormComponent;
  let fixture: ComponentFixture<ServiceAreaFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceAreaFormComponent]
    });
    fixture = TestBed.createComponent(ServiceAreaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
