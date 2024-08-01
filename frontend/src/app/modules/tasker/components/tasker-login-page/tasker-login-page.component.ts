import {Component} from '@angular/core';
import {RouteConstant} from 'src/app/shared/constants/route.constant';
import {TasklionUserRoleConstant} from 'src/app/shared/constants/tasklion-user-role.constant';

@Component({
  selector: 'tasklion-tasker-login-page',
  templateUrl: './tasker-login-page.component.html',
  styleUrls: ['./tasker-login-page.component.scss']
})
export class TaskerLoginPageComponent {

  protected readonly RouteConstant = RouteConstant;
  protected readonly UserRoleConstant = TasklionUserRoleConstant;
}
