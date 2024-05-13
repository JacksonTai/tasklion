import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UnderMaintenancePageComponent} from './under-maintenance-page.component';

describe('UnderMaintenancePageComponent', () => {
  let component: UnderMaintenancePageComponent;
  let fixture: ComponentFixture<UnderMaintenancePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnderMaintenancePageComponent]
    });
    fixture = TestBed.createComponent(UnderMaintenancePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
