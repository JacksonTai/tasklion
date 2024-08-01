import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {finalize, Observable} from "rxjs";
import {FormStateService} from "../../../../shared/services/form-state/form-state.service";
import {ServiceDetailFormConstant} from "../../../../shared/constants/form/service-detail-form.constant";
import FormUtil from "../../../../shared/utils/form.util";
import {RouteConstant} from 'src/app/shared/constants/route.constant';
import {ActivatedRoute} from "@angular/router";
import {ApiResponseModel} from "../../../../shared/models/api/api-response.model";
import {ServiceCategoryModel} from "../../models/service-category.model";
import {TaskerServiceService} from '../../services/tasker-service.service';

@Component({
  selector: 'tasklion-tasker-edit-service-page',
  templateUrl: './tasker-edit-service-page.component.html',
  styleUrls: ['./tasker-edit-service-page.component.scss']
})
export class TaskerEditServicePageComponent implements OnInit {

  protected readonly RouteConstant = RouteConstant;
  protected serviceDetailForm$: Observable<FormGroup> = new Observable();
  protected serviceDetailForm!: FormGroup;
  protected taskerServiceId?: string | null;
  protected serviceCategory?: ServiceCategoryModel | null;
  protected errorResponseMessage: string = '';

  protected isFetchingData: boolean = true;
  protected isLoading: boolean = false;
  protected isUpdateSuccess: boolean = false;
  protected isUpdateFailed: boolean = false;

  constructor(
    private taskerServiceService: TaskerServiceService,
    private formStateService: FormStateService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.initTaskerServiceDetailForm();
    this.fetchTaskerService();
  }

  initTaskerServiceDetailForm(): void {
    this.serviceDetailForm$ = this.formStateService.getForm(ServiceDetailFormConstant.FORM_ID);
    this.serviceDetailForm$.subscribe((serviceDetailForm: FormGroup): void => {
      serviceDetailForm.get('category')?.disable();
      this.serviceDetailForm = serviceDetailForm;
    });
  }

  fetchTaskerService(): void {
    this.taskerServiceId = this.route.snapshot.paramMap.get('serviceId');
    if (this.taskerServiceId) {
      this.taskerServiceService.getTaskerServiceById(this.taskerServiceId)
        .pipe(finalize((): boolean => this.isFetchingData = false))
        .subscribe({
          next: (response: ApiResponseModel<any>): void => {
            this.serviceDetailForm.patchValue(response.data);
            this.serviceCategory = response.data.category;
          }
        });
    }
  }

  updateTaskerService(): void {
    this.isUpdateSuccess = false;
    this.isUpdateFailed = false;
    FormUtil.markAllFieldsAsDirty(this.serviceDetailForm);
    if (this.serviceDetailForm.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.taskerServiceId && this.serviceCategory) {
      this.taskerServiceService.updateTaskerService(this.taskerServiceId, {
        description: this.serviceDetailForm.get('description')?.value,
      })
        .pipe(finalize((): boolean => this.isLoading = false))
        .subscribe({
          next: (response: ApiResponseModel<any>): void => {
            this.isUpdateSuccess = true;
            this.isUpdateFailed = false;
            this.serviceDetailForm.patchValue(response.data);
          },
          error: (response): void => {
            this.isUpdateSuccess = false;
            this.isUpdateFailed = true;
            this.errorResponseMessage = response.error.message;
          }
        });
    }
  }
}
