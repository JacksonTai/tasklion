import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {ValidationMessagesModel} from "../../../../shared/models/validation-messages.model";
import {CUSTOMER_FORM_VALIDATION_MESSAGE} from "../../../../shared/constants/form/customer-form.constant";
import {RegexConstant} from "../../../../shared/constants/regex.constant";
import {FormValidator} from "../../../../shared/validators/form.validator";
import {CharacterValidator} from "../../../../shared/validators/character.validator";
import {TasklionUserValidator} from "../../../../shared/validators/tasklion-user.validator";
import {TasklionUserService} from "../../../../services/user/tasklion-user.service";
import matchValidator = FormValidator.matchValidator;
import startEndUnderscoreValidator = CharacterValidator.startEndUnderscoreValidator;
import consecutiveUnderscoreValidator = CharacterValidator.consecutiveUnderscoreValidator;
import minAgeValidator = FormValidator.minAgeValidator;
import usernameExistsValidator = TasklionUserValidator.usernameExistsValidator;

@Component({
  selector: 'tasklion-customer-form',
  templateUrl: './customer-form.html',
  styleUrls: ['./customer-form.component.scss'],
})
export class CustomerFormComponent implements OnInit, OnChanges {

  @Input() cityByState: any;
  @ViewChild(FormGroupDirective) formDirective!: FormGroupDirective;

  protected readonly validationMessages: ValidationMessagesModel = CUSTOMER_FORM_VALIDATION_MESSAGE;
  states: string[] = [];
  cities: string[] = [];
  customerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private tasklionUserService: TasklionUserService
  ) {
  }

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      fullName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(RegexConstant.ALPHABETIC)
      ]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(RegexConstant.MY_PHONE_NUMBER_NO_PREFIX)
      ]),
      dateOfBirth: new FormControl('', [
        Validators.required,
        Validators.pattern(RegexConstant.DATE_YYYY_MM_DD),
        minAgeValidator(18)
      ]),
      addressLine: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
        Validators.pattern(RegexConstant.ADDRESS_LINE),
      ]),
      state: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      postcode: new FormControl('', [
        Validators.required,
        Validators.pattern(RegexConstant.POSTCODE),
      ]),
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
          updateOn: 'blur'
        }),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(RegexConstant.EMAIL),
      ]),
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
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.cityByState) {
      this.states = Object.keys(this.cityByState);
    }
  }

  onCityChange($event: any): void {
    this.cities = this.cityByState[$event.target.value];
  }

}

