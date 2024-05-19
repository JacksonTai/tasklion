import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidationMessagesModel} from "../../../models/validation-messages.model";
import {AddressDetailFormConstant} from "../../../constants/form/address-detail-form.constant";
import {FormStateService} from "../../../services/form-state/form-state.service";
import {RegexConstant} from "../../../constants/regex.constant";
import {StartupService} from "../../../services/startup/startup.service";
import {ApiResponseModel} from "../../../models/api/api-response.model";

@Component({
  selector: 'tasklion-address-detail-form',
  templateUrl: './address-detail-form.component.html',
  styleUrls: ['./address-detail-form.component.scss']
})
export class AddressDetailFormComponent implements OnInit, AfterViewInit {

  protected readonly validationMessages: ValidationMessagesModel = AddressDetailFormConstant.VALIDATION_MESSAGE;
  protected addressDetailForm!: FormGroup;
  protected cityByState: any = {};
  protected states: string[] = [];
  protected cities: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private formStateService: FormStateService,
    private startupService: StartupService,
  ) {
  }

  ngOnInit(): void {
    this.initAddressDetailForm();
    this.getCitiesByState();
  }

  ngAfterViewInit(): void {
  }

  initAddressDetailForm(): void {
    this.addressDetailForm = this.formBuilder.group({
      state: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      postcode: new FormControl('', [
        Validators.required,
        Validators.pattern(RegexConstant.POSTCODE),
      ]),
    });
    this.formStateService.setForm(AddressDetailFormConstant.FORM_ID, this.addressDetailForm);
  }

  getCitiesByState(): void {
    this.startupService.getCityByState().subscribe({
      next: (response: ApiResponseModel<any>): void => {
        if (response.data) {
          this.cityByState = response.data
          this.states = Object.keys(this.cityByState);
        }
      }
    });
  }

  onCityChange($event: any): void {
    this.cities = this.cityByState[$event.target.value];
  }

}
