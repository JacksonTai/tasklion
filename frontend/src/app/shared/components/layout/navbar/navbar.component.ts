import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/shared/services/auth/auth.service';
import {RouteConstant} from "../../../constants/route.constant";
import {TasklionUserRoleConstant} from "../../../constants/tasklion-user-role.constant";
import {JwtPayloadModel} from "../../../models/auth/jwt-payload.model";

@Component({
  selector: 'tasklion-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  protected readonly RouteConstant = RouteConstant;
  protected isAuthenticated: boolean = false;
  protected username: string | undefined;

  protected isAdmin: boolean = false;
  protected isTaskerMode: boolean = false;
  protected isCustomerMode: boolean = false;
  protected isTasker: boolean = false;
  protected isCustomer: boolean = false;

  constructor(
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (this.isAuthenticated) {
      const jwtPayload: JwtPayloadModel | null = this.authService.getJwtPayload()
      if (jwtPayload) {
        let {username, currentRole, roles} = jwtPayload;
        this.username = username;

        roles = roles?.map((role: string) => role.replace('ROLE_', ''));
        this.isTasker = roles.includes(TasklionUserRoleConstant.TASKER) ?? false;
        this.isCustomer = roles.includes(TasklionUserRoleConstant.CUSTOMER) ?? false;

        if (currentRole) {
          this.isAdmin = currentRole === TasklionUserRoleConstant.ADMIN;
          this.isTaskerMode = currentRole === TasklionUserRoleConstant.TASKER;
          this.isCustomerMode = currentRole === TasklionUserRoleConstant.CUSTOMER;
        }
      }
    }
  }

  logout(): void {
    this.authService.handleLogoutAndRedirect();
  }

  toggleCurrentUserRole(): void {
    const role: string = this.isCustomerMode ?
      TasklionUserRoleConstant.TASKER :
      TasklionUserRoleConstant.CUSTOMER;
    this.authService.switchRole(role).subscribe((): void => {
      window.location.href = RouteConstant.ROOT;
    });
  }

}
