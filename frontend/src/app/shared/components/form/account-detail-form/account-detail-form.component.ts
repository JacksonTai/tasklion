import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TasklionUserService} from "../../../../services/tasklion-user/tasklion-user.service";
import {RegexConstant} from "../../../constants/regex.constant";
import {CommonValidator} from "../../../validators/common.validator";
import {TasklionUserValidator} from "../../../validators/tasklion-user.validator";
import {AccountDetailFormConstant} from "../../../constants/form/account-detail-form.constant";
import {ValidationMessagesModel} from "../../../models/validation-messages.model";
import {FormStateService} from "../../../services/form-state/form-state.service";
import matchValidator = CommonValidator.matchValidator;
import emailExistsValidator = TasklionUserValidator.emailExistsValidator;
import usernameExistsValidator = TasklionUserValidator.usernameExistsValidator;
import consecutiveUnderscoreValidator = CommonValidator.consecutiveUnderscoreValidator;
import startEndUnderscoreValidator = CommonValidator.startEndUnderscoreValidator;

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
    private tasklionUserService: TasklionUserService,
  ) {
  }

  ngOnInit(): void {
    this.accountDetailForm = this.formBuilder.group({
      username: new FormControl('', {
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
      email: new FormControl('', {
        validators: [
          Validators.required,
          Validators.pattern(RegexConstant.EMAIL),
        ],
        asyncValidators: emailExistsValidator(this.tasklionUserService),
        updateOn: 'blur',
      }),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(RegexConstant.UPPER_CASE),
        Validators.pattern(RegexConstant.LOWER_CASE),
        Validators.pattern(RegexConstant.PASSWORD_SPECIAL_CHAR),
        Validators.pattern(RegexConstant.NUMBER),
        matchValidator('confirmPassword', true)
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        matchValidator('password'),
      ]),
    });
    this.formStateService.setForm(AccountDetailFormConstant.FORM_ID, this.accountDetailForm);
  }

}
