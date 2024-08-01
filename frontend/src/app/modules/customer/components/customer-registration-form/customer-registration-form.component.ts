import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {combineLatest, finalize, Observable} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {RouteConstant} from 'src/app/shared/constants/route.constant';
import {CustomerService} from 'src/app/modules/customer/services/customer.service';
import {FormStateService} from "src/app/shared/services/form-state/form-state.service";
import {PersonalDetailFormConstant} from 'src/app/shared/constants/form/personal-detail-form.constant';
import {AccountDetailFormConstant} from 'src/app/shared/constants/form/account-detail-form.constant';
import FormUtil from 'src/app/shared/utils/form.util';
import {CustomerMapper} from 'src/app/shared/mappers/customer.mapper';
import {ApiResponseModel} from "../../../../shared/models/api/api-response.model";

@Component({
  selector: 'tasklion-customer-registration-form',
  templateUrl: './customer-registration-form.component.html',
  styleUrls: ['./customer-registration-form.component.scss'],
})
export class CustomerRegistrationFormComponent implements OnInit {

  @Output() registrationSuccess: EventEmitter<ApiResponseModel<any>> = new EventEmitter<ApiResponseModel<any>>();

  protected readonly RouteConstant = RouteConstant;
  protected personalDetailForm$: Observable<FormGroup> = new Observable();
  protected accountDetailForm$: Observable<FormGroup> = new Observable();
  protected personalDetailForm!: FormGroup;
  protected accountDetailForm!: FormGroup;
  protected isLoading: boolean = false;

  constructor(
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    private formStateService: FormStateService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.personalDetailForm$ = this.formStateService.getForm(PersonalDetailFormConstant.FORM_ID);
    this.accountDetailForm$ = this.formStateService.getForm(AccountDetailFormConstant.FORM_ID);
  }

  register(): void {
    combineLatest([this.personalDetailForm$, this.accountDetailForm$])
      .subscribe(([personalDetailForm, accountDetailForm]): void => {
        this.personalDetailForm = personalDetailForm;
        this.accountDetailForm = accountDetailForm;
        FormUtil.markAllFieldsAsDirty(this.personalDetailForm);
        FormUtil.markAllFieldsAsDirty(this.accountDetailForm);
        if (!this.personalDetailForm.valid || !this.accountDetailForm.valid) {
          return
        }
        const registrationForm: FormGroup = this.formBuilder.group({
          personalDetail: this.personalDetailForm.value,
          accountDetail: this.accountDetailForm.value,
        })
        this.isLoading = true;
        this.customerService.registerCustomer(CustomerMapper.toModel(registrationForm.value))
          .pipe(finalize((): boolean => this.isLoading = false))
          .subscribe({
            next: (response: ApiResponseModel<any>): void => {
              this.registrationSuccess.emit(response);
            },
            error: (): void => {
              this.router.navigate([RouteConstant.INTERNAL_SERVER_ERROR], {skipLocationChange: true});
            },
          })
      });
  }

}

