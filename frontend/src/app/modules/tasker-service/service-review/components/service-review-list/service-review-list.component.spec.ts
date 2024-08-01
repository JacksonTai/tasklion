import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ServiceReviewListComponent} from './service-review-list.component';

describe('ServiceReviewListComponent', () => {
  let component: ServiceReviewListComponent;
  let fixture: ComponentFixture<ServiceReviewListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceReviewListComponent]
    });
    fixture = TestBed.createComponent(ServiceReviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
