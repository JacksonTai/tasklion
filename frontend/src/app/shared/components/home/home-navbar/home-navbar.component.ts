import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/shared/services/auth/auth.service';
import {RouteConstant} from "../../../constants/route.constant";
import {UserRoleConstant} from "../../../constants/user-role.constant";

@Component({
  selector: 'tasklion-home-navbar',
  templateUrl: './home-navbar.component.html',
  styleUrls: ['./home-navbar.component.scss']
})
export class HomeNavbarComponent implements OnInit {

  protected readonly RouteConstant = RouteConstant;
  protected isAuthenticated: boolean = false;
  protected username: string | undefined;
  protected roles: string[] | undefined;
  protected isAdmin: boolean = false;
  protected isTasker: boolean = false;
  protected isCustomer: boolean = false;

  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (this.isAuthenticated) {
      const decodedToken = this.authService.getDecodedAccessToken();
      this.username = decodedToken?.username;
      this.roles = decodedToken?.roles?.map(role => role.replace('ROLE_', ''));
      if (this.roles) {
        this.isAdmin = this.roles.includes(UserRoleConstant.ADMIN.toUpperCase());
        this.isTasker = this.roles.includes(UserRoleConstant.TASKER.toUpperCase());
        this.isCustomer = this.roles.includes(UserRoleConstant.CUSTOMER.toUpperCase());
      }
    }
  }

  logout(): void {
    this.authService.logout();
  }

}
