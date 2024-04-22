import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevTemplateComponent } from './dev-template.component';

describe('DevTemplateComponent', () => {
  let component: DevTemplateComponent;
  let fixture: ComponentFixture<DevTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DevTemplateComponent]
    });
    fixture = TestBed.createComponent(DevTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
