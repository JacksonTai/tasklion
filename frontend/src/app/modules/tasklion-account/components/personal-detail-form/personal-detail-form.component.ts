import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TasklionAccountService} from 'src/app/modules/tasklion-account/services/tasklion-account.service';
import {PersonalDetailModel} from '../../models/personal-detail.model';
import {ValidationMessagesModel} from 'src/app/shared/models/validation-messages.model';
import {PersonalDetailFormConstant} from 'src/app/shared/constants/form/personal-detail-form.constant';
import {FormStateService} from 'src/app/shared/services/form-state/form-state.service';
import {RegexConstant} from 'src/app/shared/constants/regex.constant';
import {CommonValidator} from "../../../../shared/validators/common.validator";
import {PersonalDetailValidator} from "../../../../shared/validators/personal-detail.validator";
import consecutiveSpaceValidator = CommonValidator.consecutiveSpaceValidator;
import fullNameExistsValidator = PersonalDetailValidator.fullNameExistsValidator;
import phoneNumberExistsValidator = PersonalDetailValidator.phoneNumberExistsValidator;
import minAgeValidator = PersonalDetailValidator.minAgeValidator;

@Component({
  selector: 'tasklion-personal-detail-form',
  templateUrl: './personal-detail-form.component.html',
  styleUrls: ['./personal-detail-form.component.scss']
})
export class PersonalDetailFormComponent implements OnInit, OnChanges {

  @Input()
  personalDetail?: PersonalDetailModel;

  protected readonly validationMessages: ValidationMessagesModel = PersonalDetailFormConstant.VALIDATION_MESSAGE;
  protected personalDetailForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private formStateService: FormStateService,
    private tasklionAccountService: TasklionAccountService,
  ) {
  }

  ngOnInit(): void {
    this.initPersonalDetailForm();
  }

  ngOnChanges(): void {
    this.initPersonalDetailForm();
    if (this.personalDetail) {
      this.personalDetailForm.patchValue(this.personalDetail);
    }
  }

  initPersonalDetailForm(): void {
    this.personalDetailForm = this.formBuilder.group({
      fullName: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.pattern(RegexConstant.ALPHABETIC),
          consecutiveSpaceValidator()
        ],
        asyncValidators: fullNameExistsValidator(this.tasklionAccountService, this.personalDetail?.fullName),
        updateOn: 'blur',
      }),
      phoneNumber: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.pattern(RegexConstant.MY_PHONE_NUMBER_NO_PREFIX)
        ],
        asyncValidators: phoneNumberExistsValidator(this.tasklionAccountService, this.personalDetail?.phoneNumber),
        updateOn: 'blur',
      }),
      dateOfBirth: new FormControl(null, [
        Validators.required,
        Validators.pattern(RegexConstant.DATE_YYYY_MM_DD),
        minAgeValidator(18)
      ]),
    });
    this.formStateService.setForm(PersonalDetailFormConstant.FORM_ID, this.personalDetailForm);
  }

}
