import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../shared/services/auth/auth.service";
import {RouteConstant} from "../../../../shared/constants/route.constant";
import FormUtil from "../../../../shared/utils/form.util";
import {combineLatest, finalize, Observable} from "rxjs";
import {FormStateService} from "../../../../shared/services/form-state/form-state.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {PersonalDetailFormConstant} from "../../../../shared/constants/form/personal-detail-form.constant";
import {AccountDetailFormConstant} from "../../../../shared/constants/form/account-detail-form.constant";
import {TaskerDetailFormConstant} from "../../../../shared/constants/form/tasker-detail-form.constant";
import {Router} from "@angular/router";
import {CustomerMapper} from "../../../../shared/mappers/customer.mapper";
import {TaskerMapper} from "../../../../shared/mappers/tasker.mapper";

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
  protected personalDetailForm!: FormGroup;
  protected accountDetailForm!: FormGroup;

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
    this.personalDetailForm$ = this.formStateService.getForm(PersonalDetailFormConstant.FORM_ID);
    this.accountDetailForm$ = this.formStateService.getForm(AccountDetailFormConstant.FORM_ID);
    this.taskerDetailForm$ = this.formStateService.getForm(TaskerDetailFormConstant.FORM_ID);
  }

  register(): void {
    combineLatest([this.personalDetailForm$, this.accountDetailForm$])
      .subscribe(([personalDetailForm, accountDetailForm]): void => {
        this.personalDetailForm = personalDetailForm;
        this.accountDetailForm = accountDetailForm;
        FormUtil.markAllFieldsAsDirty(this.personalDetailForm);
        FormUtil.markAllFieldsAsDirty(this.accountDetailForm);
        this.getRegistrationObservable()
          .pipe(finalize((): boolean => this.isLoading = false))
          .subscribe({
            next: (): void => {
              window.location.href = RouteConstant.DASHBOARD;
            },
            error: (response: any): void => {
              console.error('Registration failed:', response);
            },
          })
      });
  }

  private getRegistrationObservable(): Observable<any> {
    let registrationObservable: Observable<any> = new Observable();
    switch (this.router.url.slice(1)) {
      case RouteConstant.REGISTER_CUSTOMER:
        if (this.personalDetailForm.valid && this.accountDetailForm.valid) {
          this.isLoading = true;
          this.customerForm = this.formBuilder.group({
            personalDetail: this.personalDetailForm.value,
            accountDetail: this.accountDetailForm.value,
          });
          registrationObservable = this.authService.registerCustomer(CustomerMapper.mapFrom(this.customerForm.value));
        }
        return registrationObservable;
      case RouteConstant.REGISTER_TASKER:
        this.taskerDetailForm$.subscribe((taskerDetailForm: FormGroup) => {
          FormUtil.markAllFieldsAsDirty(taskerDetailForm);
          this.taskerForm = this.formBuilder.group({
            personalDetail: this.personalDetailForm.value,
            accountDetail: this.accountDetailForm.value,
            taskerDetail: taskerDetailForm.value,
          });
          if (this.personalDetailForm.valid && this.accountDetailForm.valid && taskerDetailForm.valid) {
            this.isLoading = true;
            registrationObservable = this.authService.registerTasker(TaskerMapper.mapFrom(this.taskerForm.value));
          }
        });
        return registrationObservable;
      default:
        throw new Error('Unknown registration type');
    }
  }

}
