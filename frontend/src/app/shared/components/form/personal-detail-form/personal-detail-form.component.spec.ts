import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonalDetailFormComponent} from './personal-detail-form.component';

describe('PersonalDetailFormComponent', () => {
  let component: PersonalDetailFormComponent;
  let fixture: ComponentFixture<PersonalDetailFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonalDetailFormComponent]
    });
    fixture = TestBed.createComponent(PersonalDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
