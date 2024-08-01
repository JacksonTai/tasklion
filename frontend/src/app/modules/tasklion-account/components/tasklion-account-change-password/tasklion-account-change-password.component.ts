import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {ValidationMessagesModel} from "../../../../shared/models/validation-messages.model";
import {AccountDetailFormConstant} from "../../../../shared/constants/form/account-detail-form.constant";
import {RegexConstant} from "../../../../shared/constants/regex.constant";
import {CommonValidator} from "../../../../shared/validators/common.validator";
import {TasklionAccountService} from "../../services/tasklion-account.service";
import {RouteConstant} from "../../../../shared/constants/route.constant";
import {AuthService} from 'src/app/shared/services/auth/auth.service';
import {finalize} from "rxjs";
import notMatchValidator = CommonValidator.notMatchValidator;
import matchValidator = CommonValidator.matchValidator;

@Component({
  selector: 'tasklion-tasklion-account-change-password',
  templateUrl: './tasklion-account-change-password.component.html',
  styleUrls: ['./tasklion-account-change-password.component.scss'],
})
export class TasklionAccountChangePasswordComponent implements OnInit {

  protected readonly validationMessages: ValidationMessagesModel = AccountDetailFormConstant.VALIDATION_MESSAGE;
  protected readonly RouteConstant = RouteConstant;

  protected changePasswordForm!: FormGroup;
  protected isLoading: boolean = false;
  protected isChangePasswordFailed: boolean = false;
  protected isChangePasswordSuccess: boolean = false;
  protected changePasswordFailedMessage: string | undefined;

  constructor(
    private tasklionAccountService: TasklionAccountService,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.initChangePasswordForm();
  }

  initChangePasswordForm(): void {
    this.changePasswordForm = new FormGroup({
      password: new FormControl(null, [
        Validators.required,
        matchValidator('newPassword', true),
      ]),
      newPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(RegexConstant.UPPER_CASE),
        Validators.pattern(RegexConstant.LOWER_CASE),
        Validators.pattern(RegexConstant.PASSWORD_SPECIAL_CHAR),
        Validators.pattern(RegexConstant.NUMBER),
        matchValidator('password'),
        notMatchValidator('confirmPassword', true),
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required,
        notMatchValidator('newPassword'),
      ]),
    });
  }

  changePassword(formDirective: FormGroupDirective): void {
    this.isChangePasswordSuccess = false;
    if (this.changePasswordForm.invalid) {
      return;
    }
    const username: string | null = this.authService.getJwtPayload()?.username || null;
    if (!username) {
      return
    }
    this.isLoading = true;
    this.tasklionAccountService.changePassword(username, this.changePasswordForm.value)
      .pipe(finalize((): boolean => this.isLoading = false))
      .subscribe({
        next: (): void => {
          formDirective.resetForm();
          this.changePasswordForm.reset();
          this.isChangePasswordFailed = false;
          this.isChangePasswordSuccess = true;
        },
        error: (response: any): void => {
          this.changePasswordFailedMessage = response?.error?.message || 'An error occurred, please try again later.';
          this.isChangePasswordFailed = true;
          this.isChangePasswordSuccess = false;
        }
      });
  }
}
