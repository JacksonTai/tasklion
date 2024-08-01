import {Component, OnInit} from '@angular/core';
import {RouteConstant} from "../../../../shared/constants/route.constant";
import {ActivatedRoute, Router} from "@angular/router";
import {finalize} from "rxjs";
import {TaskService} from '../../services/task.service';
import {JwtPayloadModel} from "../../../../shared/models/auth/jwt-payload.model";
import {TasklionUserRoleConstant} from "../../../../shared/constants/tasklion-user-role.constant";
import {AuthService} from 'src/app/shared/services/auth/auth.service';
import {DateTimeUtil} from "../../../../shared/utils/datetime.util";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TaskerAvailabilityResponseModel} from "../../../tasker-availability/models/tasker-availability-response.model";
import {
  TaskerAvailabilityService
} from "../../../tasker-availability/services/tasker-availability/tasker-availability.service";
import {ApiResponseModel} from "../../../../shared/models/api/api-response.model";
import {RegexConstant} from 'src/app/shared/constants/regex.constant';
import {ServiceAreaService} from "../../../tasker-service/service-area/services/service-area.service";
import {CommonTaskRequestModel} from "../../models/common-task-request.model";

@Component({
  selector: 'tasklion-update-task-page',
  templateUrl: './update-task-page.component.html',
  styleUrls: ['./update-task-page.component.scss']
})
export class UpdateTaskPageComponent implements OnInit {

  protected readonly RouteConstant = RouteConstant;

  protected task: any
  protected taskerAvailabilities: TaskerAvailabilityResponseModel = {};
  protected taskerUsername!: string;
  protected serviceAreas: any = {};

  protected cityOptions: string[] = [];
  protected stateOptions: string[] = [];
  protected postcodeOptions: string[] = [];
  protected timeOptions: string[] = [];

  protected isFetchingData: boolean = false;
  protected isUpdateFailed: boolean = false;
  protected isUpdating: boolean = false;
  protected isTasker: boolean = false;

  protected updateTaskForm!: FormGroup;
  protected taskId!: string;
  protected duration!: string;
  protected date: Date | null = null;
  protected today: Date = new Date();
  protected minDate: Date = this.today.getHours() >= 21 ? DateTimeUtil.addDays(this.today, 1) : this.today;
  protected maxDate: Date = DateTimeUtil.addDays(this.today, 14);
  protected disabledDates: Date[] = [];
  protected errorResponseMessage: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private taskService: TaskService,
    private taskerAvailabilityService: TaskerAvailabilityService,
    private serviceAreaService: ServiceAreaService,
  ) {
  }

  ngOnInit(): void {
    this.fetchTaskDetail();
  }

  fetchTaskDetail(): void {
    this.isFetchingData = true;
    const taskId: string | null = this.activatedRoute.snapshot.paramMap.get('taskId');
    if (taskId) {
      this.taskId = taskId;
      this.taskService.getTaskById(taskId, true)
        .subscribe({
          next: (response: any): void => {
            this.task = response.data;
            this.date = new Date(this.task.date);
            this.duration = DateTimeUtil.getHourDuration(this.task.startTime, this.task.endTime).toString();
            this.fetchTaskerServiceArea();
          },
          error: (): void => {
            this.isFetchingData = false;
          }
        });
    }
  }

  fetchTaskerServiceArea(): void {
    const jwtPayload: JwtPayloadModel | null = this.authService.getJwtPayload();
    if (jwtPayload && jwtPayload.username && jwtPayload.currentRole) {
      this.isTasker = jwtPayload.currentRole == TasklionUserRoleConstant.TASKER;
      this.taskerUsername = this.isTasker ? jwtPayload.username : this.task.taskerUsername;
    }
    if (this.taskerUsername) {
      this.serviceAreaService.getServiceAreaOptions(this.taskerUsername)
        .subscribe({
          next: (response: ApiResponseModel<any>): void => {
            if (response.data) {
              this.serviceAreas = response.data;
              this.stateOptions = Object.keys(this.serviceAreas);
              this.initUpdateTaskForm();
            }
          }
        });
    }
  }

  fetchTaskerAvailability(): void {
    if (this.taskerUsername && this.duration && this.taskId) {
      this.taskerAvailabilityService.getTaskerAvailability(this.taskerUsername, this.duration, Number(this.taskId))
        .pipe(finalize((): boolean => this.isFetchingData = false))
        .subscribe({
          next: (response: ApiResponseModel<any>): void => {
            this.taskerAvailabilities = response.data;
            this.disabledDates = this.getDisabledDates(this.taskerAvailabilities);
            if (this.date && this.disabledDates.map((date: Date) => date.getDate()).includes(this.date.getDate())) {
              this.date = null;
              this.updateTaskForm.get('time')?.setValue(null);
            }
            this.updateTimeOptions();
          }
        });
    }
  }

  initUpdateTaskForm(): void {
    this.updateTaskForm = this.formBuilder.group({
      state: [this.task.serviceArea.state, Validators.required],
      city: [null, Validators.required],
      postcode: [null, [
        Validators.required,
        Validators.pattern(RegexConstant.POSTCODE),
      ]],
      time: [DateTimeUtil.to12HourFormat(this.task.startTime), Validators.required],
      duration: [DateTimeUtil.getHourDuration(this.task.startTime, this.task.endTime).toString(), Validators.required],
      remarks: [{value: this.task.remarks, disabled: this.isTasker}],
    });
    this.updateCityOptions(this.task.serviceArea.state);
    this.updateTaskForm.get('city')?.setValue(this.task.serviceArea.city);
    this.updatePostcodeOptions(this.task.serviceArea.city);
    this.updateTaskForm.get('postcode')?.setValue(this.task.serviceArea.postcode);

    this.updateTaskForm.get('state')?.valueChanges.subscribe(state => {
      this.updateCityOptions(state);
    });
    this.updateTaskForm.get('city')?.valueChanges.subscribe(city => {
      this.updatePostcodeOptions(city);
    });

    this.onDateChange(new Date(this.task.date));
    this.duration = DateTimeUtil.getHourDuration(this.task.startTime, this.task.endTime).toString();
    this.fetchTaskerAvailability();
    this.updateTaskForm.get('duration')?.valueChanges.subscribe(duration => {
      this.duration = duration;
      this.fetchTaskerAvailability();
    });
  }

  isInitialDateSelected(): boolean {
    return this.date?.getDate() == new Date(this.task.date).getDate();
  }

  onSubmit(): void {
    this.isUpdateFailed = false;
    if (this.updateTaskForm.invalid) {
      this.updateTaskForm.markAllAsTouched();
      return;
    }
    this.isUpdating = true;
    let startTime: Date = DateTimeUtil.toDateTime(this.updateTaskForm.get('time')?.value);
    let endTime: Date = DateTimeUtil.addHour(DateTimeUtil.toDateTime(this.updateTaskForm.get('time')?.value), Number(this.duration));
    if (this.date) {
      const commonTaskRequestModel: CommonTaskRequestModel = {
        serviceCategory: this.task.serviceCategory,
        date: this.formatDate(this.date),
        startTime: DateTimeUtil.to24HourFormat(DateTimeUtil.toTimeString(startTime)),
        endTime: DateTimeUtil.to24HourFormat(DateTimeUtil.toTimeString(endTime)),
        serviceArea: {
          state: this.updateTaskForm.get('state')?.value,
          city: this.updateTaskForm.get('city')?.value,
          postcode: this.updateTaskForm.get('postcode')?.value,
        },
        remarks: this.updateTaskForm.get('remarks')?.value,
      }
      this.taskService.updateTask(this.taskId, commonTaskRequestModel)
        .pipe(finalize((): boolean => this.isUpdating = false))
        .subscribe({
          next: (): void => {
            this.router.navigate(["/", RouteConstant.TASK, this.taskId]);
            this.isUpdateFailed = false;
          },
          error: (response: any): void => {
            this.isUpdateFailed = true;
            this.errorResponseMessage = response.error.message;
          }
        });
    }
  }

  onDateChange(date: Date): void {
    this.date = date;
    this.updateTimeOptions();
  }

  updateTimeOptions(): void {
    if (this.date) {
      const dateStr: string = this.formatDate(new Date(this.date));
      if (dateStr && this.taskerAvailabilities[dateStr]) {
        this.timeOptions = this.taskerAvailabilities[dateStr].map((time: string) => {
          const date: Date = DateTimeUtil.toDateTime(time);
          return DateTimeUtil.toTimeString(date);
        });
        if (!this.isInitialDateSelected()) {
          this.updateTaskForm.get('time')?.setValue(null);
        }
        return;
      }
    }
    this.timeOptions = [];
  }

  updateCityOptions(state: string): void {
    if (state && this.serviceAreas[state]) {
      this.cityOptions = Object.keys(this.serviceAreas[state]);
      this.postcodeOptions = [];
      this.updateTaskForm.get('city')?.setValue(null);
      this.updateTaskForm.get('postcode')?.setValue(null);
    } else {
      this.cityOptions = [];
      this.postcodeOptions = [];
    }
  }

  updatePostcodeOptions(city: string): void {
    const state: string = this.updateTaskForm.get('state')?.value;
    if (state && city && this.serviceAreas[state][city]) {
      this.updateTaskForm.get('postcode')?.setValue(null);
      this.postcodeOptions = this.serviceAreas[state][city];
    } else {
      this.postcodeOptions = [];
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

}
