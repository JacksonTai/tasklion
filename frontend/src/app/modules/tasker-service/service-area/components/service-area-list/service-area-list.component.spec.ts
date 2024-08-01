import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ServiceAreaListComponent} from './service-area-list.component';

describe('ServiceAreaListComponent', () => {
  let component: ServiceAreaListComponent;
  let fixture: ComponentFixture<ServiceAreaListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceAreaListComponent]
    });
    fixture = TestBed.createComponent(ServiceAreaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
