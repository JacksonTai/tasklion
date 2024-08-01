import {Component, OnInit} from '@angular/core';
import {RouteConstant} from "../../../../shared/constants/route.constant";
import {FormStateService} from 'src/app/shared/services/form-state/form-state.service';
import {finalize, Observable} from "rxjs";
import {FormGroup} from "@angular/forms";
import FormUtil from "../../../../shared/utils/form.util";
import {AuthService} from 'src/app/shared/services/auth/auth.service';
import {AddTaskerServiceRequestModel} from '../../models/add-tasker-service-request.model';
import {ServiceDetailFormConstant} from "../../../../shared/constants/form/service-detail-form.constant";
import {ApiResponseModel} from "../../../../shared/models/api/api-response.model";
import {Router} from '@angular/router';
import {TaskerServiceService} from '../../services/tasker-service.service';

@Component({
  selector: 'tasklion-tasker-add-service-page',
  templateUrl: './tasker-add-service-page.component.html',
  styleUrls: ['./tasker-add-service-page.component.scss']
})
export class TaskerAddServicePageComponent implements OnInit {

  protected readonly RouteConstant = RouteConstant;
  protected serviceDetailForm!: FormGroup;
  protected serviceDetailForm$: Observable<FormGroup> = new Observable();
  protected errorResponseMessage: string = '';

  protected isLoading: boolean = false;
  protected isResponseError: boolean = false;

  constructor(
    private taskerServiceService: TaskerServiceService,
    private formStateService: FormStateService,
    private authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.initTaskerServiceDetailForm();
  }

  initTaskerServiceDetailForm(): void {
    this.serviceDetailForm$ = this.formStateService.getForm(ServiceDetailFormConstant.FORM_ID);
    this.serviceDetailForm$.subscribe((serviceDetailForm: FormGroup): void => {
      this.serviceDetailForm = serviceDetailForm;
    });
  }

  addTaskerServices(): void {
    this.isResponseError = false;
    FormUtil.markAllFieldsAsDirty(this.serviceDetailForm);
    if (this.serviceDetailForm.invalid) {
      return;
    }
    this.isLoading = true;
    const username: string | undefined = this.authService.getJwtPayload()?.username;
    if (username) {
      const addTaskerServiceRequestModel: AddTaskerServiceRequestModel = {
        taskerServiceModels: [this.serviceDetailForm.value],
        username: username
      };
      this.taskerServiceService.createTaskerService(addTaskerServiceRequestModel)
        .pipe(finalize((): boolean => this.isLoading = false))
        .subscribe({
          next: (response: ApiResponseModel<any>): void => {
            this.router.navigate([RouteConstant.TASKER, RouteConstant.SERVICE, response.data[0]]);
          },
          error: (response): void => {
            this.errorResponseMessage = response.error.message;
            this.isResponseError = true;
           }
        });
    }
  }

}
