import {Component, OnInit} from '@angular/core';
import {ValidationMessagesModel} from "../../../../shared/models/validation-messages.model";
import {ServiceDetailFormConstant} from "../../../../shared/constants/form/service-detail-form.constant";
import {RouteConstant} from 'src/app/shared/constants/route.constant';
import {ServiceCategoryService} from "../../services/service-category/service-category.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FormStateService} from "../../../../shared/services/form-state/form-state.service";
import {finalize} from "rxjs";

@Component({
  selector: 'tasklion-tasker-service-form',
  templateUrl: './tasker-service-form.component.html',
  styleUrls: ['./tasker-service-form.component.scss']
})
export class TaskerServiceFormComponent implements OnInit {

  protected readonly RouteConstant = RouteConstant;
  protected readonly validationMessages: ValidationMessagesModel = ServiceDetailFormConstant.VALIDATION_MESSAGE;

  protected taskerServiceDetailForm!: FormGroup;
  protected isFetchingData: boolean = true;
  protected categories: string[] = [];

  constructor(
    private serviceCategoryService: ServiceCategoryService,
    private formStateService: FormStateService,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.fetchTaskerServiceCategories();
    this.initTaskerServiceDetailForm();
  }

  fetchTaskerServiceCategories(): void {
    this.serviceCategoryService.getTaskerServiceCategories()
      .pipe(finalize((): boolean => this.isFetchingData = false))
      .subscribe({
        next: (response: any): void => this.categories = response.data
      });
  }

  initTaskerServiceDetailForm(): void {
    this.taskerServiceDetailForm = this.formBuilder.group({
      category: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.maxLength(50)
        ]
      }),
      description: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.maxLength(250)
        ]
      }),
    });
    this.formStateService.setForm(ServiceDetailFormConstant.FORM_ID, this.taskerServiceDetailForm);
  }

}
