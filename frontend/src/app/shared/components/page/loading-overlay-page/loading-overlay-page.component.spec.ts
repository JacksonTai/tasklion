import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LoadingOverlayPageComponent} from './loading-overlay-page.component';

describe('LoadingOverlayPageComponent', () => {
  let component: LoadingOverlayPageComponent;
  let fixture: ComponentFixture<LoadingOverlayPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingOverlayPageComponent]
    });
    fixture = TestBed.createComponent(LoadingOverlayPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
