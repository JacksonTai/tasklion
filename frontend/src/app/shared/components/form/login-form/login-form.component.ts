import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {finalize} from "rxjs";
import {RouteConstant} from "../../../constants/route.constant";
import {ValidationMessagesModel} from "../../../models/validation-messages.model";
import {LoginFormConstant} from "../../../constants/form/login-form.constant";
import {TasklionUserRoleConstant} from "../../../constants/tasklion-user-role.constant";
import {RedirectService} from "../../../services/redirect/redirect.service";
import {ApiResponseModel} from "../../../models/api/api-response.model";
import {JwtPayloadModel} from "../../../models/auth/jwt-payload.model";
import {ApiService} from "../../../services/api/api.service";

@Component({
  selector: 'tasklion-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  @Input()
  currentRole: string = TasklionUserRoleConstant.CUSTOMER;

  protected readonly validationMessages: ValidationMessagesModel = LoginFormConstant.VALIDATION_MESSAGE;
  protected readonly RouteConstant = RouteConstant;
  protected loginForm!: FormGroup;
  protected isLoading: boolean = false;
  protected isLoginFailed: boolean = false;
  protected loginFailedMessage: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private redirectService: RedirectService,
    private apiService: ApiService,
  ) {
  }

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.login({...this.loginForm.value, currentRole: this.currentRole})
        .pipe(finalize((): boolean => this.isLoading = false))
        .subscribe({
          next: (response: ApiResponseModel<any>): void => this.handleSuccessfulLogin(response),
          error: (response: any): void => {
            this.loginFailedMessage = response?.error?.message || 'An error occurred, please try again later.';
            this.isLoginFailed = true;
          }
        });
    }
  }

  private handleSuccessfulLogin(response: ApiResponseModel<any>): void {
    const urlParam: string | null = this.apiService.getUrlParam('redirect');
    const isCustomerBecomeTasker: boolean = urlParam == RouteConstant.CUSTOMER_BECOME_A_TASKER;
    if (isCustomerBecomeTasker && this.isExistingTasker(response.data.accessToken)) {
      this.loginFailedMessage = 'You are already a tasker. Please Sign in';
      this.isLoginFailed = true;
      return;
    }
    this.authService.handleTokenResponse(response);
    this.handleRedirect(urlParam);
  }

  private handleRedirect(urlParam: string | null): void {
    urlParam ? window.location.href = urlParam : this.redirectService.redirectOnSuccessLogin(this.currentRole);
  }

  private isExistingTasker(accessToken: string): boolean {
    const decodedToken: JwtPayloadModel | null = this.authService.getDecodedToken(accessToken);
    if (!decodedToken) {
      return false;
    }
    const roles: string[] = decodedToken?.roles?.map((role: string) => role.replace('ROLE_', ''));
    return roles.includes(TasklionUserRoleConstant.TASKER);
  }

}
