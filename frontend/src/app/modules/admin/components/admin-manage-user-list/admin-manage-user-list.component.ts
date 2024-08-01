import {Component} from '@angular/core';
import {TasklionUserRoleConstant} from "../../../../shared/constants/tasklion-user-role.constant";
import {RouteConstant} from 'src/app/shared/constants/route.constant';
import {Router} from "@angular/router";

@Component({
  selector: 'tasklion-admin-manage-user-list',
  templateUrl: './admin-manage-user-list.component.html',
  styleUrls: ['./admin-manage-user-list.component.scss']
})
export class AdminManageUserListComponent {

  protected readonly RouteConstant = RouteConstant;
  protected readonly TasklionUserRoleConstant = TasklionUserRoleConstant;
  protected readonly tasklionUserRole: string[] = [
    TasklionUserRoleConstant.CUSTOMER,
    TasklionUserRoleConstant.TASKER,
  ];

  protected activeTab: string = TasklionUserRoleConstant.CUSTOMER

  constructor(
    private router: Router
  ) {
  }

  protected onTabChange(status: string): void {
    this.activeTab = status;
    this.router.navigate([RouteConstant.USER, status.toLowerCase()]);
  }

}
