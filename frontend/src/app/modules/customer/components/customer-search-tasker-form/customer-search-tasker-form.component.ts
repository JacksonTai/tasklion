import {Component, OnInit} from '@angular/core';
import {
  ServiceCategoryService
} from 'src/app/modules/tasker-service/services/service-category/service-category.service';
import {ApiResponseModel} from "../../../../shared/models/api/api-response.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidationMessagesModel} from "../../../../shared/models/validation-messages.model";
import {CustomerSearchTaskerFormConstant} from "./customer-search-tasker-form.constant";
import {StartupService} from 'src/app/shared/services/startup/startup.service';
import {RouteConstant} from "../../../../shared/constants/route.constant";
import {ActivatedRoute, Router} from "@angular/router";
import {RegexConstant} from "../../../../shared/constants/regex.constant";

@Component({
  selector: 'tasklion-customer-search-tasker-form',
  templateUrl: './customer-search-tasker-form.component.html',
  styleUrls: ['./customer-search-tasker-form.component.scss']
})
export class CustomerSearchTaskerFormComponent implements OnInit {

  protected readonly validationMessages: ValidationMessagesModel = CustomerSearchTaskerFormConstant.VALIDATION_MESSAGE;

  protected searchTaskerForm!: FormGroup;
  protected categories: string[] = [];
  protected cityByState: any = {};
  protected states: string[] = [];
  protected cities: string[] = [];

  protected isFetchingData: boolean = false;
  protected isSubmitting: boolean = false;

  constructor(
    private serviceCategoryService: ServiceCategoryService,
    private startupService: StartupService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.initSearchTaskerForm();
    this.getTaskerServiceCategories();
    this.getCitiesByState();
    this.populateFormFromUrlParams();
  }

  initSearchTaskerForm(): void {
    this.searchTaskerForm = this.formBuilder.group({
      category: [null, Validators.required],
      state: [null, Validators.required],
      city: [null, Validators.required],
      postcode: new FormControl(null, [
        Validators.required,
        Validators.pattern(RegexConstant.POSTCODE),
      ]),
      duration: [null, Validators.required]
    });
  }

  getTaskerServiceCategories(): void {
    this.serviceCategoryService.getTaskerServiceCategories().subscribe({
      next: (response: ApiResponseModel<any>): void => {
        if (response.data) {
          this.categories = response.data;
        }
      }
    });
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

  populateFormFromUrlParams(): void {
    this.route.queryParams.subscribe(params => {
      if (params['serviceCategory']) {
        this.searchTaskerForm.get('category')?.setValue(params['serviceCategory']);
      }
      if (params['state']) {
        this.searchTaskerForm.get('state')?.setValue(params['state']);
        this.updateCityListBasedOnState();
      }
      if (params['city']) {
        this.searchTaskerForm.get('city')?.setValue(params['city']);
      }
      if (params['postcode']) {
        this.searchTaskerForm.get('postcode')?.setValue(params['postcode']);
      }
      if (params['duration']) {
        this.searchTaskerForm.get('duration')?.setValue(params['duration']);
      }
    });
  }

  updateCityListBasedOnState(): void {
    const stateControl = this.searchTaskerForm.get('state');
    const cityControl = this.searchTaskerForm.get('city');
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
    const cityControl = this.searchTaskerForm.get('city');
    if (cityControl && this.cities.length) {
      if (!this.cities.includes(cityControl.value)) {
        cityControl.setValue(this.cities[0]);
      }
    }
  }

  searchTasker(): void {
    if (this.searchTaskerForm.valid) {
      const category = this.searchTaskerForm.get('category')?.value;
      const state = this.searchTaskerForm.get('state')?.value;
      const city = this.searchTaskerForm.get('city')?.value;
      const postcode = this.searchTaskerForm.get('postcode')?.value;
      const duration = this.searchTaskerForm.get('duration')?.value;
      this.router.navigate([`/${RouteConstant.BOOKING}/${RouteConstant.TASKER}`], {
        queryParams: {serviceCategory: category, state: state, city: city, postcode: postcode, duration: duration}
      });
    }
  }
}
