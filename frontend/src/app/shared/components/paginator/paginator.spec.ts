import {ComponentFixture, TestBed} from '@angular/core/testing';

import {Paginator} from './paginator';

describe('PaginatorComponent', () => {
  let component: Paginator;
  let fixture: ComponentFixture<Paginator>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Paginator]
    });
    fixture = TestBed.createComponent(Paginator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
