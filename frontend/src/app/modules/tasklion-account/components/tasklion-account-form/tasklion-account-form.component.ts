import {Component, OnInit} from '@angular/core';
import {RouteConstant} from "../../../../shared/constants/route.constant";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {finalize, Observable} from "rxjs";
import {ValidationMessagesModel} from "../../../../shared/models/validation-messages.model";
import {AccountDetailFormConstant} from "../../../../shared/constants/form/account-detail-form.constant";
import {TasklionAccountService} from "../../services/tasklion-account.service";
import {FormStateService} from "../../../../shared/services/form-state/form-state.service";
import {AuthService} from "../../../../shared/services/auth/auth.service";
import {JwtPayloadModel} from "../../../../shared/models/auth/jwt-payload.model";
import {PersonalDetailFormConstant} from "../../../../shared/constants/form/personal-detail-form.constant";
import {RegexConstant} from "../../../../shared/constants/regex.constant";
import {ApiResponseModel} from "../../../../shared/models/api/api-response.model";
import {TasklionUserValidator} from "../../../../shared/validators/tasklion-user.validator";
import FormUtil from "../../../../shared/utils/form.util";
import {TasklionAccountModel} from '../../models/tasklion-account.model';
import {PersonalDetailModel} from '../../models/personal-detail.model';
import emailExistsValidator = TasklionUserValidator.emailExistsValidator;

@Component({
  selector: 'tasklion-tasker-account-form',
  templateUrl: './tasklion-account-form.component.html',
  styleUrls: ['./tasklion-account-form.component.scss']
})
export class TasklionAccountFormComponent implements OnInit {

  protected readonly RouteConstant = RouteConstant;
  protected readonly validationMessages: ValidationMessagesModel = AccountDetailFormConstant.VALIDATION_MESSAGE;

  protected tasklionAccountForm!: FormGroup;
  protected personalDetailForm!: FormGroup;
  protected personalDetailForm$: Observable<FormGroup> = new Observable();

  protected personalDetail!: PersonalDetailModel;
  protected tasklionAccount!: TasklionAccountModel;
  protected isFetchingData: boolean = true;
  protected isUpdating: boolean = false;
  protected isUpdateSuccess: boolean = false;

  constructor(
    private tasklionAccountService: TasklionAccountService,
    private formStateService: FormStateService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    const jwtPayload: JwtPayloadModel | null = this.authService.getJwtPayload();
    if (jwtPayload) {
      this.fetchTasklionAccountData(jwtPayload.username);
    }
  }

  fetchTasklionAccountData(username: string): void {
    this.tasklionAccountService.getTasklionAccount(username)
      .pipe(finalize((): boolean => this.isFetchingData = false))
      .subscribe({
        next: (response: ApiResponseModel<any>): void => {
          this.tasklionAccount = response.data.tasklionAccount;
          this.personalDetail = response.data.personalDetail;
          this.initTasklionAccountForm();
          this.initPersonalDetailForm();
          this.tasklionAccountForm.patchValue({
            username: this.tasklionAccount.username,
            email: this.tasklionAccount.email,
          });
        }
      });
  }

  initTasklionAccountForm(): void {
    this.tasklionAccountForm = this.formBuilder.group({
      email: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.pattern(RegexConstant.EMAIL),
        ],
        asyncValidators: emailExistsValidator(this.tasklionAccountService, this.tasklionAccount.email),
        updateOn: 'blur',
      }),
    });
  }

  initPersonalDetailForm(): void {
    this.personalDetailForm$ = this.formStateService.getForm(PersonalDetailFormConstant.FORM_ID);
    this.personalDetailForm$.subscribe((personalDetailForm: FormGroup): void => {
      this.personalDetailForm = personalDetailForm;
      this.personalDetailForm.patchValue({
        fullName: this.personalDetail.fullName,
        phoneNumber: this.personalDetail.phoneNumber,
        dateOfBirth: this.personalDetail.dateOfBirth,
      });
    });
  }

  updateTasklionAccount(): void {
    this.isUpdateSuccess = false;
    FormUtil.markAllFieldsAsDirty(this.personalDetailForm);
    FormUtil.markAllFieldsAsDirty(this.tasklionAccountForm);
    if (!this.personalDetailForm.valid || !this.tasklionAccountForm.valid) {
      return
    }
    this.isUpdating = true;
    const tasklionAccountDetailForm: FormGroup = this.formBuilder.group({
      personalDetail: this.personalDetailForm.value,
      tasklionAccount: this.tasklionAccountForm.value,
    })
    const username: string | null = this.authService.getJwtPayload()?.username || null;
    if (!username) {
      return
    }
    this.tasklionAccountService.updateTasklionAccount(username, tasklionAccountDetailForm.value)
      .pipe(finalize((): boolean => this.isUpdating = false))
      .subscribe({
        next: (): void => {
          this.isUpdateSuccess = true;
        }
      })
  }
}
