import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../shared/services/auth/auth.service";
import {RouteConstant} from "../../../../shared/constants/route.constant";
import FormUtil from "../../../../shared/utils/form.util";
import {combineLatest, finalize, Observable} from "rxjs";
import {FormStateService} from "../../../../shared/services/form-state/form-state.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {PersonalDetailFormConstant} from "../../../../shared/constants/form/personal-detail-form.constant";
import {AccountDetailFormConstant} from "../../../../shared/constants/form/account-detail-form.constant";
import {TaskerDetailFormConstant} from "../../../../shared/constants/form/tasker-detail-form.constant";
import {Router} from "@angular/router";
import {CustomerMapper} from "../../../../shared/mappers/customer.mapper";
import {TaskerMapper} from "../../../../shared/mappers/tasker.mapper";
import {ApiResponseModel} from "../../../../shared/models/api/api-response.model";
import {AuthResponseModel} from "../../../../shared/models/auth/auth-response.model";

@Component({
  selector: 'tasklion-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit {

  protected readonly RouteConstant = RouteConstant;
  protected personalDetailForm$: Observable<FormGroup> = new Observable();
  protected accountDetailForm$: Observable<FormGroup> = new Observable();
  protected taskerDetailForm$: Observable<FormGroup> = new Observable();

  protected isLoading: boolean = false;
  protected customerForm!: FormGroup;
  protected taskerForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private formStateService: FormStateService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.customerForm = this.formBuilder.group({
      personalDetail: new FormControl(),
      accountDetail: new FormControl()
    });
    this.taskerForm = this.formBuilder.group({
      personalDetail: new FormControl(),
      accountDetail: new FormControl(),
      taskerDetail: new FormControl()
    });
    this.personalDetailForm$ = this.formStateService.getForm(PersonalDetailFormConstant.FORM_ID);
    this.accountDetailForm$ = this.formStateService.getForm(AccountDetailFormConstant.FORM_ID);
    this.taskerDetailForm$ = this.formStateService.getForm(TaskerDetailFormConstant.FORM_ID);
  }

  register(): void {
    combineLatest([this.personalDetailForm$, this.accountDetailForm$])
      .subscribe(([personalDetailForm, accountDetailForm]): void => {
        FormUtil.markAllFieldsAsDirty(personalDetailForm);
        FormUtil.markAllFieldsAsDirty(accountDetailForm);
        switch (this.router.url.slice(1)) {
          case RouteConstant.REGISTER_CUSTOMER:
            this.customerForm.get('personalDetail')?.setValue(personalDetailForm.value);
            this.customerForm.get('accountDetail')?.setValue(accountDetailForm.value);
            if (personalDetailForm.valid && accountDetailForm.valid) {
              this.isLoading = true;
              this.authService.registerCustomer(CustomerMapper.mapFrom(this.customerForm.value))
                .pipe(
                  finalize(() => this.isLoading = false)
                )
                .subscribe({
                  next: (response: ApiResponseModel<AuthResponseModel>) => {
                    window.location.href = RouteConstant.DASHBOARD;
                  },
                  error: (response: any) => {
                  }
                });
            }
            break;
          case RouteConstant.REGISTER_TASKER:
            this.taskerForm.get('personalDetail')?.setValue(personalDetailForm.value);
            this.taskerForm.get('accountDetail')?.setValue(accountDetailForm.value);
            this.taskerDetailForm$.subscribe((taskerDetailForm: FormGroup): void => {
              FormUtil.markAllFieldsAsDirty(taskerDetailForm);
              this.taskerForm.get('taskerDetail')?.setValue(taskerDetailForm.value);
              if (personalDetailForm.valid && accountDetailForm.valid && taskerDetailForm.valid) {
                this.isLoading = true;
                this.authService.registerTasker(TaskerMapper.mapFrom(this.taskerForm.value))
                  .pipe(
                    finalize(() => this.isLoading = false)
                  )
                  .subscribe({
                    next: (response: ApiResponseModel<AuthResponseModel>) => {
                      window.location.href = RouteConstant.DASHBOARD;
                    },
                    error: (response: any) => {
                    }
                  });
              }
            })
            break;
        }
      });
  }

}
