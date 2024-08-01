import {Component, OnInit} from '@angular/core';
import {RouteConstant} from "../../../../shared/constants/route.constant";
import {FormStateService} from "../../../../shared/services/form-state/form-state.service";
import {AuthService} from "../../../../shared/services/auth/auth.service";
import {Router} from "@angular/router";
import {TaskerAvailabilityService} from '../../services/tasker-availability/tasker-availability.service';
import {FormGroup} from "@angular/forms";
import {finalize, Observable} from "rxjs";
import {TaskerAvailabilityFormConstant} from "../tasker-availability-form/tasker-availability-form.constant";
import FormUtil from "../../../../shared/utils/form.util";
import {DateTimeUtil} from "../../../../shared/utils/datetime.util";
import {DatePipe} from "@angular/common";
import {TaskerAvailabilityGenericModel} from "../../models/tasker-availability-generic.model";

@Component({
  selector: 'tasklion-tasker-add-availability-page',
  templateUrl: './tasker-add-availability-page.component.html',
  styleUrls: ['./tasker-add-availability-page.component.scss'],
  providers: [DatePipe]
})
export class TaskerAddAvailabilityPageComponent implements OnInit {

  protected readonly RouteConstant = RouteConstant;
  protected taskerAvailabilityForm!: FormGroup;
  protected taskerAvailabilityForm$: Observable<FormGroup> = new Observable();
  protected errorResponseMessage: string = '';

  protected isLoading: boolean = false;
  protected isResponseError: boolean = false;

  constructor(
    private formStateService: FormStateService,
    private authService: AuthService,
    private router: Router,
    private datePipe: DatePipe,
    private taskerAvailabilityService: TaskerAvailabilityService,
  ) {
  }

  ngOnInit(): void {
    this.initTaskerAvailabilityForm();
  }

  initTaskerAvailabilityForm(): void {
    this.taskerAvailabilityForm$ = this.formStateService.getForm(TaskerAvailabilityFormConstant.FORM_ID);
    this.taskerAvailabilityForm$.subscribe((taskerAvailabilityForm: FormGroup): void => {
      this.taskerAvailabilityForm = taskerAvailabilityForm;
    });
  }

  addTaskerAvailability(): void {
    this.isResponseError = false;
    FormUtil.markAllFieldsAsDirty(this.taskerAvailabilityForm);
    if (this.taskerAvailabilityForm.invalid) {
      return;
    }
    this.isLoading = true;
    const username: string | undefined = this.authService.getJwtPayload()?.username;
    if (username) {
      const taskerAvailabilityGenericModel: TaskerAvailabilityGenericModel = {
        availabilityType: this.taskerAvailabilityForm.value.availabilityType,
        days: this.taskerAvailabilityForm.value.days,
        startTime: DateTimeUtil.to24HourFormat(this.taskerAvailabilityForm.value.startTime),
        endTime: DateTimeUtil.to24HourFormat(this.taskerAvailabilityForm.value.endTime),
      }
      const date: string | null = this.datePipe.transform(this.taskerAvailabilityForm.value.date, 'yyyy-MM-dd');
      if (date) {
        taskerAvailabilityGenericModel.date = date;
      }
      this.taskerAvailabilityService.addTaskerAvailability(username, taskerAvailabilityGenericModel)
        .pipe(finalize((): boolean => this.isLoading = false))
        .subscribe({
          next: (): void => {
            this.router.navigate([RouteConstant.TASKER, RouteConstant.AVAILABILITY]);
          },
          error: (response): void => {
            this.errorResponseMessage = response.error.message;
            this.isResponseError = true;
          }
        });
    }
  }

}
