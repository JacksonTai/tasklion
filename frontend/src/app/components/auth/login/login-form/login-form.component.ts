import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../shared/services/auth/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {finalize} from "rxjs";
import {CookieService} from "ngx-cookie";
import {AuthResponseModel} from "../../../../shared/model/auth/auth-response.model";
import {RouteConstant} from "../../../../shared/constants/route.constant";
import {ApiResponseModel} from "../../../../shared/model/api/api-response.model";
import {ErrorMessage} from "../../../../shared/model/ErrorMessage";

@Component({
  selector: 'tasklion-login-page',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  protected loginForm!: FormGroup;
  protected isLoading: boolean = false;
  protected isLoginFailed: boolean = false;
  protected loginFailedMessage: string | undefined;
  protected validationMessages: ErrorMessage = {
    email: {
      required: 'Email is required',
      invalid: 'Please provide a valid email',
    },
    password: {
      required: 'Password is required',
    }
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private cookieService: CookieService
  ) {
  }

  ngOnInit(): void {
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
            this.cookieService.put('access-token', response?.data?.accessToken);
            this.cookieService.put('refresh-token', response?.data?.refreshToken);
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
