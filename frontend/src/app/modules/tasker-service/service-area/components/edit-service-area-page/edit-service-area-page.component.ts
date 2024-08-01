import {Component, OnInit} from '@angular/core';
import {finalize, Observable} from "rxjs";
import {FormGroup} from "@angular/forms";
import {RouteConstant} from 'src/app/shared/constants/route.constant';
import {FormStateService} from "../../../../../shared/services/form-state/form-state.service";
import {ActivatedRoute} from "@angular/router";
import {ServiceAreaService} from "../../services/service-area.service";
import {ServiceDetailFormConstant} from "../../../../../shared/constants/form/service-detail-form.constant";
import {ApiResponseModel} from 'src/app/shared/models/api/api-response.model';
import {ServiceAreaFormConstant} from "../service-area-form/service-area-form.constant";

@Component({
  selector: 'tasklion-edit-service-area-page',
  templateUrl: './edit-service-area-page.component.html',
  styleUrls: ['./edit-service-area-page.component.scss']
})
export class EditServiceAreaPageComponent implements OnInit {

  protected readonly RouteConstant = RouteConstant;
  protected serviceAreaForm$: Observable<FormGroup> = new Observable();
  protected serviceAreaForm!: FormGroup;
  protected serviceAreaId?: string | null;
  protected errorResponseMessage: string = '';

  protected isFetchingData: boolean = true;
  protected isLoading: boolean = false;
  protected isUpdateSuccess: boolean = false;
  protected isUpdateFailed: boolean = false;

  constructor(
    private serviceAreaService: ServiceAreaService,
    private formStateService: FormStateService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.initServiceAreaForm();
    this.fetchServiceArea();
  }

  initServiceAreaForm(): void {
    this.serviceAreaForm$ = this.formStateService.getForm(ServiceAreaFormConstant.FORM_ID);
    this.serviceAreaForm$.subscribe((serviceDetailForm: FormGroup): void => {
      this.serviceAreaForm = serviceDetailForm;
    });
  }

  fetchServiceArea(): void {
    this.serviceAreaId = this.route.snapshot.paramMap.get('serviceAreaId');
    if (this.serviceAreaId) {
      this.serviceAreaService.getServiceAreaById(this.serviceAreaId)
        .pipe(finalize((): boolean => this.isFetchingData = false))
        .subscribe({
          next: (response: ApiResponseModel<any>): void => {
            this.serviceAreaForm.patchValue(response.data);
          }
        });
    }
  }

  updateServiceArea(): void {
    this.isUpdateSuccess = false;
    this.isUpdateFailed = false;
    this.serviceAreaForm$ = this.formStateService.getForm(ServiceDetailFormConstant.FORM_ID);
    if (this.serviceAreaId) {
      this.serviceAreaService.updateServiceArea(this.serviceAreaId, this.serviceAreaForm.value)
        .pipe(finalize((): boolean => this.isLoading = false))
        .subscribe({
          next: (response: ApiResponseModel<any>): void => {
            this.isUpdateSuccess = true;
            this.isUpdateFailed = false;
            this.serviceAreaForm.patchValue(response.data);
          },
          error: (error: any): void => {
            this.isUpdateFailed = true;
            this.errorResponseMessage = error.error.message;
          }
        });
    }
  }

}
