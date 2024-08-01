import {Component} from '@angular/core';
import {TasklionUserRoleConstant} from "../../../../shared/constants/tasklion-user-role.constant";
import {RouteConstant} from "../../../../shared/constants/route.constant";

@Component({
  selector: 'tasklion-admin-login-page',
  templateUrl: './admin-login-page.component.html',
  styleUrls: ['./admin-login-page.component.scss']
})
export class AdminLoginPageComponent {

  protected readonly RouteConstant = RouteConstant;
  protected readonly UserRoleConstant = TasklionUserRoleConstant;

}
