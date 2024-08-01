import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidationMessagesModel} from 'src/app/shared/models/validation-messages.model';
import {FormStateService} from 'src/app/shared/services/form-state/form-state.service';
import {StartupService} from 'src/app/shared/services/startup/startup.service';
import {ApiResponseModel} from 'src/app/shared/models/api/api-response.model';
import {RegexConstant} from "../../../../../shared/constants/regex.constant";
import {ServiceAreaFormConstant} from "./service-area-form.constant";

@Component({
  selector: 'tasklion-service-area-form',
  templateUrl: './service-area-form.component.html',
  styleUrls: ['./service-area-form.component.scss']
})
export class ServiceAreaFormComponent implements OnInit {

  protected readonly validationMessages: ValidationMessagesModel = ServiceAreaFormConstant.VALIDATION_MESSAGE;
  protected serviceAreaForm!: FormGroup;
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
    this.initServiceAreaForm();
    this.getCitiesByState();
  }

  initServiceAreaForm(): void {
    this.serviceAreaForm = this.formBuilder.group({
      state: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      postcode: new FormControl('', [
        Validators.required,
        Validators.pattern(RegexConstant.POSTCODE),
      ]),
    });
    this.formStateService.setForm(ServiceAreaFormConstant.FORM_ID, this.serviceAreaForm);
  }

  getCitiesByState(): void {
    this.startupService.getCityByState().subscribe({
      next: (response: ApiResponseModel<any>): void => {
        if (response.data) {
          this.cityByState = response.data
          this.states = Object.keys(this.cityByState);
          this.updateCityListBasedOnState();
        }
      }
    });
  }

  updateCityListBasedOnState(): void {
    const stateControl = this.serviceAreaForm.get('state');
    const cityControl = this.serviceAreaForm.get('city');
    if (stateControl && cityControl) {
      const stateValue = stateControl.value;
      if (stateValue) {
        this.cities = this.cityByState[stateValue] || [];
      }
    }
  }

  onCityChange($event: any): void {
    const stateValue = $event.target.value;
    this.cities = this.cityByState[stateValue] || [];
    const cityControl = this.serviceAreaForm.get('city');
    if (cityControl && this.cities.length) {
      if (!this.cities.includes(cityControl.value)) {
        cityControl.setValue(this.cities[0]);
      }
    }
  }

}
