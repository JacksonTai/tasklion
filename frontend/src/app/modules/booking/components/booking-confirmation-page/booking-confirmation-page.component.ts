import {Component, OnInit, ViewChild} from '@angular/core';
import {TaskService} from 'src/app/modules/task/services/task.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {RouteConstant} from '../../../../shared/constants/route.constant';
import {DateTimeUtil} from '../../../../shared/utils/datetime.util';
import {
  TaskerAvailabilityService
} from '../../../tasker-availability/services/tasker-availability/tasker-availability.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiResponseModel} from '../../../../shared/models/api/api-response.model';
import {TaskerAvailabilityResponseModel} from '../../../tasker-availability/models/tasker-availability-response.model';
import {finalize} from "rxjs";
import {CommonTaskRequestModel} from "../../../task/models/common-task-request.model";
import {
  InformationModalComponent
} from "../../../../shared/components/modal/information-modal/information-modal.component";

@Component({
  selector: 'tasklion-booking-confirmation-page',
  templateUrl: './booking-confirmation-page.component.html',
  styleUrls: ['./booking-confirmation-page.component.scss']
})
export class BookingConfirmationPageComponent implements OnInit {

  @ViewChild('infoModal') infoModal!: InformationModalComponent;

  protected times: string[] = [];
  protected today: Date = new Date();
  protected minDate: Date = this.today.getHours() >= 21 ? DateTimeUtil.addDays(this.today, 1) : this.today;
  protected maxDate: Date = DateTimeUtil.addDays(this.today, 14);

  protected serviceCategory!: string;
  protected state!: string;
  protected city!: string;
  protected postcode!: string;
  protected duration!: string;
  protected taskerUsername!: string;
  protected date: any;
  protected confirmDetailsForm!: FormGroup;
  protected taskerAvailabilities: TaskerAvailabilityResponseModel = {};
  protected disabledDates: Date[] = [];
  protected createdTaskId!: string;

  protected isFetchingData: boolean = true;
  protected isSubmitting: boolean = false;
  protected isRequestFailed: boolean = false;

  constructor(
    private taskerAvailabilityService: TaskerAvailabilityService,
    private taskService: TaskService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.initConfirmDetails();
    this.initConfirmDetailsForm();
    this.fetchTaskerAvailability();
    this.onDateChange();
  }

  initConfirmDetails(): void {
    this.route.queryParams.subscribe((params: Params): void => {
      this.serviceCategory = params['serviceCategory'] || null;
      this.state = params['state'] || null;
      this.city = params['city'] || null;
      this.postcode = params['postcode'] || null;
      this.duration = params['duration'] || null;
      this.taskerUsername = params['tasker'] || null;
    });
  }

  initConfirmDetailsForm(): void {
    this.confirmDetailsForm = this.formBuilder.group({
      date: [null, Validators.required],
      time: [null, Validators.required],
      remarks: [null],
    });
  }

  fetchTaskerAvailability(): void {
    if (this.taskerUsername && this.duration) {
      this.taskerAvailabilityService.getTaskerAvailability(this.taskerUsername, this.duration)
        .pipe(finalize((): boolean => this.isFetchingData = false))
        .subscribe({
          next: (response: ApiResponseModel<any>): void => {
            this.taskerAvailabilities = response.data;
            this.disabledDates = this.getDisabledDates(this.taskerAvailabilities);
            this.updateAvailableTimes();
          },
          error: (): void => {
            this.isRequestFailed = true;
          }
        });
    }
  }

  getDisabledDates(availabilityData: TaskerAvailabilityResponseModel): Date[] {
    const disabledDatesSet: Set<string> = new Set<string>();
    const currentDate: Date = new Date(this.minDate);
    while (currentDate <= this.maxDate) {
      const dateStr: string = this.formatDate(currentDate);
      if (!availabilityData[dateStr]) {
        disabledDatesSet.add(dateStr);
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return Array.from(disabledDatesSet).map((dateStr: string) => new Date(dateStr));
  }

  formatDate(date: Date): string {
    const day: string = ('0' + date.getDate()).slice(-2);
    const month: string = ('0' + (date.getMonth() + 1)).slice(-2);
    const year: number = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  onSubmit(): void {
    if (this.confirmDetailsForm.invalid) {
      this.confirmDetailsForm.markAllAsTouched();
      return;
    }
    this.isSubmitting = true;
    let startTime: Date = DateTimeUtil.toDateTime(this.confirmDetailsForm.get('time')?.value);
    let endTime: Date = DateTimeUtil.addHour(DateTimeUtil.toDateTime(this.confirmDetailsForm.get('time')?.value), Number(this.duration));
    const commonTaskRequestModel: CommonTaskRequestModel = {
      serviceCategory: {
        name: this.serviceCategory,
      },
      date: this.formatDate(new Date(this.confirmDetailsForm.get('date')?.value)),
      startTime: DateTimeUtil.to24HourFormat(DateTimeUtil.toTimeString(startTime)),
      endTime: DateTimeUtil.to24HourFormat(DateTimeUtil.toTimeString(endTime)),
      serviceArea: {
        state: this.state,
        city: this.city,
        postcode: this.postcode,
      },
      remarks: this.confirmDetailsForm.get('remarks')?.value
    }
    this.taskService.createTask(this.taskerUsername, commonTaskRequestModel)
      .pipe(finalize((): boolean => this.isSubmitting = false))
      .subscribe({
        next: (response: ApiResponseModel<any>): void => {
          this.createdTaskId = response.data;
          this.infoModal.title = 'Tasker Invitation Sent';
          this.infoModal.message = 'Your task is considered scheduled once the Tasker accepts your invitation.';
          this.infoModal.open();
        }
      });
  }

  onDateChange(): void {
    this.confirmDetailsForm.get('date')?.valueChanges.subscribe(selectedDate => {
      if (selectedDate) {
        const formattedDate: string = this.formatDate(new Date(selectedDate));
        this.updateAvailableTimes(formattedDate);
      } else {
        this.times = [];
      }
    });
  }

  onInfoModalClosed(): void {
    this.router.navigate([RouteConstant.TASK, this.createdTaskId])
  }

  updateAvailableTimes(dateStr?: string): void {
    if (dateStr && this.taskerAvailabilities[dateStr]) {
      this.times = this.taskerAvailabilities[dateStr].map((time: string) => {
        const date: Date = DateTimeUtil.toDateTime(time);
        return DateTimeUtil.toTimeString(date);
      });
    } else {
      this.times = [];
    }
  }

  goToDashboard(): void {
    const queryParams: Params = this.route.snapshot.queryParams;
    this.router.navigate([RouteConstant.CUSTOMER, RouteConstant.DASHBOARD], {queryParams});
  }

  goToBrowseTasker(): void {
    const {tasker, ...remainingQueryParams} = this.route.snapshot.queryParams;
    this.router.navigate([RouteConstant.BOOKING, RouteConstant.TASKER], {queryParams: remainingQueryParams});
  }

  getDurationText(duration: string | null): string {
    switch (duration) {
      case '1':
        return 'Est. 1 hour';
      case '2':
        return 'Est. 2 hours';
      case '3':
        return 'Est. 3 hours';
      default:
        return '';
    }
  }
}
