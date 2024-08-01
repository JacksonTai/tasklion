import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ServiceReviewFormComponent} from './service-review-form.component';

describe('ServiceReviewFormComponent', () => {
  let component: ServiceReviewFormComponent;
  let fixture: ComponentFixture<ServiceReviewFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceReviewFormComponent]
    });
    fixture = TestBed.createComponent(ServiceReviewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
