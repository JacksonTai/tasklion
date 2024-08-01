import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {
  ServiceCategoryService
} from 'src/app/modules/tasker-service/services/service-category/service-category.service';
import {finalize} from "rxjs";
import {RouteConstant} from 'src/app/shared/constants/route.constant';
import {ServiceDetailFormConstant} from "../../../../shared/constants/form/service-detail-form.constant";
import {ValidationMessagesModel} from 'src/app/shared/models/validation-messages.model';
import {FormStateService} from 'src/app/shared/services/form-state/form-state.service';

@Component({
  selector: 'tasklion-tasker-services-form',
  templateUrl: './tasker-services-form.component.html',
  styleUrls: ['./tasker-services-form.component.scss']
})
export class TaskerServicesFormComponent implements OnInit {

  protected readonly RouteConstant = RouteConstant;
  protected readonly validationMessage: ValidationMessagesModel = ServiceDetailFormConstant.VALIDATION_MESSAGE;
  protected taskerServiceDetailForm!: FormGroup;
  protected categories: string[] = [];
  protected isLoaded: boolean = false;

  constructor(
    private serviceCategoryService: ServiceCategoryService,
    private formBuilder: FormBuilder,
    private formStateService: FormStateService,
  ) { }

  ngOnInit(): void {
    this.serviceCategoryService.getTaskerServiceCategories()
      .pipe(finalize((): boolean => this.isLoaded = true))
      .subscribe({
        next: (response: any): void => this.categories = response.data
      });
    this.initTaskerServiceDetailForm();
  }

  initTaskerServiceDetailForm(): void {
    this.taskerServiceDetailForm = this.formBuilder.group({
      services: this.formBuilder.array([])
    });
    this.formStateService.setForm(ServiceDetailFormConstant.FORM_ID, this.taskerServiceDetailForm);
  }

  createServiceDetailFormGroup(): FormGroup {
    return this.formBuilder.group({
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
  }

  getServices(): FormArray {
    return this.taskerServiceDetailForm.get('services') as FormArray;
  }

  removeService(i: number): void {
    this.getServices().removeAt(i)
  }

  addService(): void {
    const services = this.getServices();
    if (services.invalid) {
      services.markAllAsTouched();
      return;
    }
    services.push(this.createServiceDetailFormGroup());
  }

  isFieldInvalid(index: number, field: string): boolean {
    const control = this.getServices().at(index).get(field);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

  isFieldTouched(index: number, field: string): boolean {
    const control = this.getServices().at(index).get(field);
    return control ? control.touched : false;
  }

  getFieldError(index: number, field: string, error: string): boolean {
    const control = this.getServices().at(index).get(field);
    return control ? control.hasError(error) : false;
  }

  validate(): boolean {
    if (this.taskerServiceDetailForm.invalid) {
      this.taskerServiceDetailForm.markAllAsTouched();
    }
    return this.taskerServiceDetailForm.valid;
  }

}
