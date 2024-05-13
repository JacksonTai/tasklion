import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {StartupService} from "../../../../shared/services/startup/startup.service";
import {CustomerFormComponent} from "../customer-form/customer-form.component";
import {AuthService} from "../../../../shared/services/auth/auth.service";
import {ApiResponseModel} from "../../../../shared/model/api/api-response.model";
import {AuthResponseModel} from "../../../../shared/model/auth/auth-response.model";
import {RouteConstant} from "../../../../shared/constants/route.constant";
import FormUtil from "../../../../shared/util/formUtil";

@Component({
  selector: 'tasklion-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {

  @ViewChild(CustomerFormComponent) customerFormComponent!: CustomerFormComponent;

  cityByState: any;
  registrationForm!: FormGroup;
  protected isLoading: boolean = false;
  protected isRegisterFailed: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private startupService: StartupService,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.startupService.getCityByState().subscribe(res => {
      this.cityByState = res.data
    })
    this.registrationForm = this.formBuilder.group({
      customer: new FormControl(''),
    })
  }

  formInitialized(name: string, form: FormGroup) {
    this.registrationForm.setControl(name, form);
  }

  register() {
    FormUtil.markAllFieldsAsDirty(this.customerFormComponent.customerForm);
    if (this.registrationForm.valid) {
      this.isLoading = true;
      this.authService.registerCustomer(this.registrationForm.value)
        .pipe()
        .subscribe({
          next: (response: ApiResponseModel<AuthResponseModel>) => {
            window.location.href = RouteConstant.DASHBOARD;
          },
          error: (response: any) => {
          }
        });
    }
  }

}
