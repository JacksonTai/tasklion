import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddServiceAreaPageComponent} from './add-service-area-page.component';

describe('AddServiceAreaPageComponent', () => {
  let component: AddServiceAreaPageComponent;
  let fixture: ComponentFixture<AddServiceAreaPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddServiceAreaPageComponent]
    });
    fixture = TestBed.createComponent(AddServiceAreaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
