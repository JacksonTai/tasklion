import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminStatisticPageComponent} from './admin-statistic-page.component';

describe('AdminStatisticPageComponent', () => {
  let component: AdminStatisticPageComponent;
  let fixture: ComponentFixture<AdminStatisticPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminStatisticPageComponent]
    });
    fixture = TestBed.createComponent(AdminStatisticPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
