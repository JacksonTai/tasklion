import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditServiceAreaPageComponent} from './edit-service-area-page.component';

describe('EditServiceAreaPageComponent', () => {
  let component: EditServiceAreaPageComponent;
  let fixture: ComponentFixture<EditServiceAreaPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditServiceAreaPageComponent]
    });
    fixture = TestBed.createComponent(EditServiceAreaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
