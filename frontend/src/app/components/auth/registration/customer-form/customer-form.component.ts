import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {ErrorMessage} from "../../../../shared/model/ErrorMessage";

@Component({
  selector: 'tasklion-customer-form',
  templateUrl: './customer-form.html',
  styleUrls: ['./customer-form.component.scss'],
})
export class CustomerFormComponent implements OnInit, OnChanges {

  @Input()
  cityByState: any;

  @Output() formReady = new EventEmitter<FormGroup>();

  @ViewChild(FormGroupDirective) formDirective!: FormGroupDirective;

  states: string[] = [];
  cities: string[] = [];
  customerForm!: FormGroup;
  protected validationMessages: ErrorMessage = {
    fullName: {
      required: 'Full name is required',
      invalid: 'Full name is invalid',
      maxlength: 'Full name cannot be more than 50 characters',
    },
    phoneNumber: {
      required: 'Phone number is required',
    },
    dateOfBirth: {
      required: 'Date of birth is required',
    },
    addressLine: {
      required: 'Address line is required',
    },
    state: {
      required: 'State is required',
    },
    city: {
      required: 'City is required',
    },
    postcode: {
      required: 'Postcode is required',
    },
    username: {
      required: 'Username is required',
    },
    email: {
      required: 'Email is required',
    },
    password: {
      required: 'Password is required',
    },
    confirmPassword: {
      required: 'Confirm password is required',
    },
  };

  constructor(
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      fullName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      phoneNumber: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      addressLine: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      postcode: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    }, );
    this.formReady.emit(this.customerForm);
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

