import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

import {TasklionAccountService} from 'src/app/modules/tasklion-account/services/tasklion-account.service';
import {ValidationMessagesModel} from 'src/app/shared/models/validation-messages.model';
import {AccountDetailFormConstant} from 'src/app/shared/constants/form/account-detail-form.constant';
import {FormStateService} from 'src/app/shared/services/form-state/form-state.service';
import {RegexConstant} from 'src/app/shared/constants/regex.constant';
import {CommonValidator} from "../../../../shared/validators/common.validator";
import {TasklionUserValidator} from "../../../../shared/validators/tasklion-user.validator";
import consecutiveUnderscoreValidator = CommonValidator.consecutiveUnderscoreValidator;
import startEndUnderscoreValidator = CommonValidator.startEndUnderscoreValidator;
import usernameExistsValidator = TasklionUserValidator.usernameExistsValidator;
import emailExistsValidator = TasklionUserValidator.emailExistsValidator;
import notMatchValidator = CommonValidator.notMatchValidator;

@Component({
  selector: 'tasklion-account-detail-form',
  templateUrl: './account-detail-form.component.html',
  styleUrls: ['./account-detail-form.component.scss']
})
export class AccountDetailFormComponent implements OnInit {

  protected readonly validationMessages: ValidationMessagesModel = AccountDetailFormConstant.VALIDATION_MESSAGE;
  protected accountDetailForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private formStateService: FormStateService,
    private tasklionUserService: TasklionAccountService,
  ) {
  }

  ngOnInit(): void {
    this.initAccountDetailForm();
  }

  initAccountDetailForm(): void {
    this.accountDetailForm = this.formBuilder.group({
      username: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30),
          Validators.pattern(RegexConstant.ALPHANUMERIC_AND_UNDERSCORE),
          consecutiveUnderscoreValidator(),
          startEndUnderscoreValidator(),
        ],
        asyncValidators: usernameExistsValidator(this.tasklionUserService),
        updateOn: 'blur',
      }),
      email: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.pattern(RegexConstant.EMAIL),
        ],
        asyncValidators: emailExistsValidator(this.tasklionUserService),
        updateOn: 'blur',
      }),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(RegexConstant.UPPER_CASE),
        Validators.pattern(RegexConstant.LOWER_CASE),
        Validators.pattern(RegexConstant.PASSWORD_SPECIAL_CHAR),
        Validators.pattern(RegexConstant.NUMBER),
        notMatchValidator('confirmPassword', true)
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required,
        notMatchValidator('password'),
      ]),
    });
    this.formStateService.setForm(AccountDetailFormConstant.FORM_ID, this.accountDetailForm);
  }

}
