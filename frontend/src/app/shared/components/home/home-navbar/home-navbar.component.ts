import {Component} from '@angular/core';
import {AuthService} from 'src/app/shared/services/auth/auth.service';
import {RouteConstant} from "../../../constants/route.constant";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'tasklion-home-navbar',
  templateUrl: './home-navbar.component.html',
  styleUrls: ['./home-navbar.component.scss']
})
export class HomeNavbarComponent {

  private isAuthenticated: boolean;

  constructor(
    private authService: AuthService,
  ) {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  protected readonly RouteConstant = RouteConstant;
}
