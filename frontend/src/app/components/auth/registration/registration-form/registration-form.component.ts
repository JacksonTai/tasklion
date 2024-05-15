import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {StartupService} from "../../../../shared/services/startup/startup.service";
import {CustomerFormComponent} from "../customer-form/customer-form.component";
import {AuthService} from "../../../../shared/services/auth/auth.service";
import {ApiResponseModel} from "../../../../shared/models/api/api-response.model";
import {AuthResponseModel} from "../../../../shared/models/auth/auth-response.model";
import {RouteConstant} from "../../../../shared/constants/route.constant";
import FormUtil from "../../../../shared/utils/form.util";
import {finalize} from "rxjs";
import {CustomerMapper} from "../../../../shared/mappers/customer.mapper";
import {CustomerModel} from "../../../../shared/models/customer.model";

@Component({
  selector: 'tasklion-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {

  @ViewChild(CustomerFormComponent) customerFormComponent!: CustomerFormComponent;

  protected readonly RouteConstant = RouteConstant;
  protected cityByState: any;
  protected isLoading: boolean = false;
  protected isRegisterFailed: boolean = false;

  constructor(
    private startupService: StartupService,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.startupService.getCityByState().subscribe(response => {
      this.cityByState = response.data
    })
  }

  register() {
    const customerForm: FormGroup = this.customerFormComponent.customerForm;
    const customerModel: CustomerModel = new CustomerMapper().mapFrom(customerForm.value);
    FormUtil.markAllFieldsAsDirty(customerForm);
    if (customerForm.valid) {
      this.isLoading = true;
      this.authService.registerCustomer(customerModel)
        .pipe(
          finalize(() => this.isLoading = false)
        )
        .subscribe({
          next: (response: ApiResponseModel<AuthResponseModel>) => {
            window.location.href = RouteConstant.DASHBOARD;
          },
          error: (response: any) => {
            this.isRegisterFailed = true;
          }
        });
    }
  }

}
