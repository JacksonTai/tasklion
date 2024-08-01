import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ServiceAreaPageComponent} from './service-area-page.component';

describe('ServiceAreaPageComponent', () => {
  let component: ServiceAreaPageComponent;
  let fixture: ComponentFixture<ServiceAreaPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceAreaPageComponent]
    });
    fixture = TestBed.createComponent(ServiceAreaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
