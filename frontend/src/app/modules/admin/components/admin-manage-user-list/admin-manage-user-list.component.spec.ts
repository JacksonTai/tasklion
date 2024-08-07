import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminManageUserListComponent} from './admin-manage-user-list.component';

describe('AdminManageUserListComponent', () => {
  let component: AdminManageUserListComponent;
  let fixture: ComponentFixture<AdminManageUserListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminManageUserListComponent]
    });
    fixture = TestBed.createComponent(AdminManageUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
