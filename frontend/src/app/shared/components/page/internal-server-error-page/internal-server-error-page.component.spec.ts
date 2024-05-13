import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InternalServerErrorPageComponent} from './internal-server-error-page.component';

describe('InternalServerErrorPageComponent', () => {
  let component: InternalServerErrorPageComponent;
  let fixture: ComponentFixture<InternalServerErrorPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InternalServerErrorPageComponent]
    });
    fixture = TestBed.createComponent(InternalServerErrorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
