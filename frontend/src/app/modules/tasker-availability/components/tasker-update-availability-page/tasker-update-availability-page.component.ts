import {Component, OnInit} from '@angular/core';
import {RouteConstant} from "../../../../shared/constants/route.constant";
import {FormGroup} from "@angular/forms";
import {finalize, Observable} from "rxjs";
import {FormStateService} from "../../../../shared/services/form-state/form-state.service";
import {ActivatedRoute} from "@angular/router";
import {DatePipe} from "@angular/common";
import {TaskerAvailabilityService} from "../../services/tasker-availability/tasker-availability.service";
import FormUtil from "../../../../shared/utils/form.util";
import {DateTimeUtil} from "../../../../shared/utils/datetime.util";
import {TaskerAvailabilityGenericModel} from "../../models/tasker-availability-generic.model";
import {
  TaskerAvailabilityUpdateFormConstant
} from "../tasker-availability-update-form/tasker-availability-update-form.constant";
import {ApiResponseModel} from 'src/app/shared/models/api/api-response.model';
import {TaskerAvailabilityTypeConstant} from "../../constants/tasker-availability-type.constant";

@Component({
  selector: 'tasklion-tasker-update-availability-page',
  templateUrl: './tasker-update-availability-page.component.html',
  styleUrls: ['./tasker-update-availability-page.component.scss'],
  providers: [DatePipe]
})
export class TaskerUpdateAvailabilityPageComponent implements OnInit {

  protected readonly RouteConstant = RouteConstant;
  protected taskerAvailabilityUpdateForm!: FormGroup;
  protected taskerAvailabilityUpdateForm$: Observable<FormGroup> = new Observable();
  protected errorResponseMessage: string = '';
  protected taskerAvailabilityId?: string | null;
  protected isRepeat?: boolean | null;

  protected isFetchingData: boolean = true;
  protected isLoading: boolean = false;
  protected isUpdateSuccess: boolean = false;
  protected isUpdateFailed: boolean = false;
  protected minStartTime: string = '06:00 AM';
  protected maxStartTime: string = '09:00 PM';
  protected minEndTime: string = '';

  constructor(
    private taskerAvailabilityService: TaskerAvailabilityService,
    private formStateService: FormStateService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
  ) {
  }

  ngOnInit(): void {
    this.initTaskerAvailabilityUpdateForm();
    this.fetchTaskerAvailability();
  }

  initTaskerAvailabilityUpdateForm(): void {
    this.taskerAvailabilityUpdateForm$ = this.formStateService.getForm(TaskerAvailabilityUpdateFormConstant.FORM_ID);
    this.taskerAvailabilityUpdateForm$.subscribe((taskerAvailabilityUpdateForm: FormGroup): void => {
      this.taskerAvailabilityUpdateForm = taskerAvailabilityUpdateForm
    })
  }

  fetchTaskerAvailability(): void {
    this.taskerAvailabilityId = this.route.snapshot.paramMap.get('availabilityId');
    this.isRepeat = this.route.snapshot.queryParamMap.get('isRepeat') === 'true';
    if (this.taskerAvailabilityId) {
      this.taskerAvailabilityService.getTaskerAvailabilityById(this.taskerAvailabilityId, this.isRepeat)
        .pipe(finalize((): boolean => this.isFetchingData = false))
        .subscribe({
          next: (response: ApiResponseModel<any>): void => {
            this.updateTaskerAvailabilityUpdateForm(response.data);
            this.updateMaxStartTime();
            this.updateMinEndTime();
          },
        });
    }
  }

  updateTaskerAvailabilityUpdateForm(data: TaskerAvailabilityGenericModel): void {
    this.taskerAvailabilityUpdateForm.patchValue({
      date: data.date != null ? new Date(data.date) : null,
      days: data.days != null ? data.days[0] : null,
      startTime: DateTimeUtil.to12HourFormat(data.startTime),
      endTime: DateTimeUtil.to12HourFormat(data.endTime)
    });
  }

  updateMaxStartTime(): void {
    const endTimeValue = this.taskerAvailabilityUpdateForm.get('endTime')?.value;
    if (!endTimeValue) {
      return;
    }
    const endDateTime: Date = DateTimeUtil.toDateTime(endTimeValue);
    const maxStartDateTime: Date = DateTimeUtil.subtractHour(endDateTime, 1);
    this.maxStartTime = DateTimeUtil.toTimeString(maxStartDateTime);
  }

  updateMinEndTime(): void {
    const startTimeValue = this.taskerAvailabilityUpdateForm.get('startTime')?.value;
    if (!startTimeValue) {
      return;
    }
    const startDateTime: Date = DateTimeUtil.toDateTime(startTimeValue);
    const minEndDateTime: Date = DateTimeUtil.addHour(startDateTime, 1);
    this.minEndTime = DateTimeUtil.toTimeString(minEndDateTime);
  }

  updateTaskerAvailability(): void {
    this.isUpdateSuccess = false;
    FormUtil.markAllFieldsAsDirty(this.taskerAvailabilityUpdateForm);
    if (this.taskerAvailabilityUpdateForm.invalid
    ) {
      return;
    }
    this.isLoading = true;
    if (this.taskerAvailabilityId) {
      const taskerAvailabilityGenericModel: TaskerAvailabilityGenericModel = {
        availabilityType: this.isRepeat ? TaskerAvailabilityTypeConstant.REPEAT : TaskerAvailabilityTypeConstant.DATE,
        days: [this.taskerAvailabilityUpdateForm.value.days],
        startTime: DateTimeUtil.to24HourFormat(this.taskerAvailabilityUpdateForm.value.startTime),
        endTime: DateTimeUtil.to24HourFormat(this.taskerAvailabilityUpdateForm.value.endTime),
      }
      const date: string | null = this.datePipe.transform(this.taskerAvailabilityUpdateForm.value.date, 'yyyy-MM-dd');
      if (date) {
        taskerAvailabilityGenericModel.date = date;
      }
      this.taskerAvailabilityService.updateTaskerAvailability(this.taskerAvailabilityId, taskerAvailabilityGenericModel)
        .pipe(finalize((): boolean => this.isLoading = false))
        .subscribe({
          next: (response: ApiResponseModel<any>): void => {
            this.isUpdateSuccess = true;
            this.isUpdateFailed = false;
            this.updateTaskerAvailabilityUpdateForm(response.data);
           },
          error: (response): void => {
            this.isUpdateFailed = true;
            this.errorResponseMessage = response.error.message;
          }
        });
    }
  }


}
