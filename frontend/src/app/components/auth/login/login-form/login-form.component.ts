import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../shared/services/auth/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {finalize} from "rxjs";
import {AuthResponseModel} from "../../../../shared/models/auth/auth-response.model";
import {RouteConstant} from "../../../../shared/constants/route.constant";
import {ApiResponseModel} from "../../../../shared/models/api/api-response.model";
import {ValidationMessagesModel} from "../../../../shared/models/validation-messages.model";
import {LoginFormConstant} from "../../../../shared/constants/form/login-form.constant";

@Component({
  selector: 'tasklion-login-page',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  protected readonly validationMessages: ValidationMessagesModel = LoginFormConstant.VALIDATION_MESSAGE;
  protected readonly RouteConstant = RouteConstant;
  protected loginForm!: FormGroup;
  protected isLoading: boolean = false;
  protected isLoginFailed: boolean = false;
  protected loginFailedMessage: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.login(this.loginForm.value)
        .pipe(
          finalize(() => this.isLoading = false)
        )
        .subscribe({
          next: (response: ApiResponseModel<AuthResponseModel>) => {
            this.isLoginFailed = false;
            window.location.href = RouteConstant.DASHBOARD;
          },
          error: (response: any) => {
            this.loginFailedMessage = response.error.message || 'An error occurred';
            this.isLoginFailed = true;
          }
        });
    }
  }

}
