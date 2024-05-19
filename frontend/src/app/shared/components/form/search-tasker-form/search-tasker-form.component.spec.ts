import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchTaskerFormComponent} from './search-tasker-form.component';

describe('SearchTaskerFormComponent', () => {
  let component: SearchTaskerFormComponent;
  let fixture: ComponentFixture<SearchTaskerFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchTaskerFormComponent]
    });
    fixture = TestBed.createComponent(SearchTaskerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
