import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ServiceDetailFormComponent} from './service-detail-form.component';

describe('ServiceDetailFormComponent', () => {
  let component: ServiceDetailFormComponent;
  let fixture: ComponentFixture<ServiceDetailFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceDetailFormComponent]
    });
    fixture = TestBed.createComponent(ServiceDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
