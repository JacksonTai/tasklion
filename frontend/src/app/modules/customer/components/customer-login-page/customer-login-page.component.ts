import {Component} from '@angular/core';
import {RouteConstant} from 'src/app/shared/constants/route.constant';
import {TasklionUserRoleConstant} from 'src/app/shared/constants/tasklion-user-role.constant';

@Component({
  selector: 'tasklion-customer-login-page',
  templateUrl: './customer-login-page.component.html',
  styleUrls: ['./customer-login-page.component.scss']
})
export class CustomerLoginPageComponent {

  protected readonly RouteConstant = RouteConstant;
  protected readonly UserRoleConstant = TasklionUserRoleConstant;

}
