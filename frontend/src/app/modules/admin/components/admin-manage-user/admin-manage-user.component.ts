import {Component, OnInit} from '@angular/core';
import {RouteConstant} from "../../../../shared/constants/route.constant";
import {filter, map, Observable, startWith} from "rxjs";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'tasklion-admin-manage-user',
  templateUrl: './admin-manage-user.component.html',
  styleUrls: ['./admin-manage-user.component.scss']
})
export class AdminManageUserComponent implements OnInit {

  protected readonly RouteConstant = RouteConstant;

  protected isAdminManageUserListRoute$: Observable<boolean> | undefined;

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.initIsAdminManageUserListRoute$();
  }

  initIsAdminManageUserListRoute$(): void {
    this.isAdminManageUserListRoute$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.isAdminManageUserListRoute()),
      startWith(this.isAdminManageUserListRoute())
    );
  }

  isAdminManageUserListRoute(): boolean {
    return this.router.url.includes(`/${RouteConstant.USER}`);
  }

}
