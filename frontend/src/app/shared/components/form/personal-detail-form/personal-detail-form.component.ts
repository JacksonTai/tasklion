import {Component, OnInit} from '@angular/core';
import {PersonalDetailFormConstant} from "../../../constants/form/personal-detail-form.constant";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TasklionUserService} from "../../../../services/tasklion-user/tasklion-user.service";
import {RegexConstant} from "../../../constants/regex.constant";
import {PersonalDetailValidator} from "../../../validators/personal-detail.validator";
import {ValidationMessagesModel} from "../../../models/validation-messages.model";
import {FormStateService} from "../../../services/form-state/form-state.service";
import fullNameExistsValidator = PersonalDetailValidator.fullNameExistsValidator;
import phoneNumberExistsValidator = PersonalDetailValidator.phoneNumberExistsValidator;
import minAgeValidator = PersonalDetailValidator.minAgeValidator;

@Component({
  selector: 'tasklion-personal-detail-form',
  templateUrl: './personal-detail-form.component.html',
  styleUrls: ['./personal-detail-form.component.scss']
})
export class PersonalDetailFormComponent implements OnInit {

  protected readonly validationMessages: ValidationMessagesModel = PersonalDetailFormConstant.VALIDATION_MESSAGE;
  protected personalDetailForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private formStateService: FormStateService,
    private tasklionUserService: TasklionUserService,
  ) {
  }

  ngOnInit(): void {
    this.initPersonalDetailForm();
  }

  initPersonalDetailForm(): void {
    this.personalDetailForm = this.formBuilder.group({
      fullName: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.pattern(RegexConstant.ALPHABETIC)
        ],
        asyncValidators: fullNameExistsValidator(this.tasklionUserService),
        updateOn: 'blur',
      }),
      phoneNumber: new FormControl('', {
        validators: [
          Validators.required,
          Validators.pattern(RegexConstant.MY_PHONE_NUMBER_NO_PREFIX)
        ],
        asyncValidators: phoneNumberExistsValidator(this.tasklionUserService),
        updateOn: 'blur',
      }),
      dateOfBirth: new FormControl('', [
        Validators.required,
        Validators.pattern(RegexConstant.DATE_YYYY_MM_DD),
        minAgeValidator(18)
      ]),
    });
    this.formStateService.setForm(PersonalDetailFormConstant.FORM_ID, this.personalDetailForm);
  }

}
