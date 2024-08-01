import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BecomeTaskerPageComponent} from './become-tasker-page.component';

describe('BecomeTaskerPageComponent', () => {
  let component: BecomeTaskerPageComponent;
  let fixture: ComponentFixture<BecomeTaskerPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BecomeTaskerPageComponent]
    });
    fixture = TestBed.createComponent(BecomeTaskerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
