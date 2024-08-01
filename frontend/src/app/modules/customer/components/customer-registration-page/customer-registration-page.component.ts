import {Component} from '@angular/core';
import {RouteConstant} from 'src/app/shared/constants/route.constant';
import {ApiService} from 'src/app/shared/services/api/api.service';
import {ApiResponseModel} from "../../../../shared/models/api/api-response.model";
import {AuthService} from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'tasklion-customer-registration-page',
  templateUrl: './customer-registration-page.component.html',
  styleUrls: ['./customer-registration-page.component.scss']
})
export class CustomerRegistrationPageComponent {

  protected readonly RouteConstant = RouteConstant;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
  ) {
  }

  onSuccessfulRegistration($event: ApiResponseModel<any>): void {
    this.authService.handleTokenResponse($event);
    window.location.href = this.apiService.getUrlParam('redirect') ?? RouteConstant.CUSTOMER_DASHBOARD;
  }

}
