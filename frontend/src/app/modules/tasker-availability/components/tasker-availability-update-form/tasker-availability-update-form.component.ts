import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {FormStateService} from "../../../../shared/services/form-state/form-state.service";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DateTimeUtil} from "../../../../shared/utils/datetime.util";
import {ValidationMessagesModel} from "../../../../shared/models/validation-messages.model";
import {DateConstant} from "../../../../shared/constants/date.constant";
import {TaskerAvailabilityUpdateFormConstant} from "./tasker-availability-update-form.constant";

@Component({
  selector: 'tasklion-tasker-availability-update-form',
  templateUrl: './tasker-availability-update-form.component.html',
  styleUrls: ['./tasker-availability-update-form.component.scss']
})
export class TaskerAvailabilityUpdateFormComponent implements OnInit {

  @Input() isRepeat?: boolean;
  @Input() minStartTime: string = '06:00 AM';
  @Input() maxStartTime: string = '09:00 PM';
  @Input() minEndTime?: string | null;

  protected readonly validationMessages: ValidationMessagesModel = TaskerAvailabilityUpdateFormConstant.VALIDATION_MESSAGE;
  protected readonly DateConstant = DateConstant;

  protected today: Date = new Date();
  protected disabledDates: Date[] = [];
  protected maxDate: Date = DateTimeUtil.addDays(this.today, 14);
  protected taskerAvailabilityUpdateForm!: FormGroup;

  constructor(
    private formStateService: FormStateService,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    const today: Date = new Date();
    if (today.getHours() >= 21) {
      this.disabledDates.push(today);
    }
    this.initTaskerAvailabilityUpdateForm();
  }

  initTaskerAvailabilityUpdateForm(): void {
    this.taskerAvailabilityUpdateForm = this.formBuilder.group({
      date: [null, !this.isRepeat ? Validators.required : null],
      days: [null, this.isRepeat ? Validators.required : null],
      startTime: [null, Validators.required],
      endTime: [null, Validators.required],
    });
    this.startTimeControl?.valueChanges.subscribe(() => this.updateMinEndTime());
    this.endTimeControl?.valueChanges.subscribe(() => this.updateMaxStartTime());
    this.formStateService.setForm(TaskerAvailabilityUpdateFormConstant.FORM_ID, this.taskerAvailabilityUpdateForm);
  }

  onDateChange(): void {
    const selectedDateValue: Date = this.dateControl?.value;
    const startTimeControl = this.startTimeControl
    const endTimeControl = this.endTimeControl
    if (selectedDateValue && selectedDateValue.toDateString() === this.today.toDateString()) {
      const currentTime: Date = new Date();

      // Check if start time is in the past relative to current time
      if (startTimeControl?.value) {
        const startTimeValue: Date = DateTimeUtil.toDateTime(startTimeControl?.value);
        if (startTimeValue < currentTime) {
          const roundedTime: Date = DateTimeUtil.roundMinutes(currentTime, 15);
          endTimeControl?.setValue(DateTimeUtil.toTimeString(DateTimeUtil.addHour(roundedTime, 1)));
          this.updateMinStartTime();
          this.updateMaxStartTime();
          this.cdr.detectChanges();
            startTimeControl?.setValue(DateTimeUtil.toTimeString(roundedTime));
        }
      }
      if (currentTime.getHours() >= 21) {
        this.dateControl?.setValue(DateTimeUtil.addDays(currentTime, 1));
      }
    } else {
      this.updateMinStartTime();
      this.updateMaxStartTime();
    }
  }

  updateMinStartTime(): void {
    const currentTime: Date = new Date();
    const selectedDateValue: Date = this.dateControl?.value;
    if (selectedDateValue && selectedDateValue.toDateString() === currentTime.toDateString()) {
      const roundedTime: Date = DateTimeUtil.roundMinutes(currentTime, 15);
      this.minStartTime = DateTimeUtil.toTimeString(roundedTime);
    } else {
      const sixAm: Date = new Date();
      sixAm.setHours(6, 0, 0, 0);
      this.minStartTime = DateTimeUtil.toTimeString(sixAm);
    }
  }

  updateMaxStartTime(): void {
    const endTimeValue = this.endTimeControl?.value;
    if (!endTimeValue) {
      return;
    }
    const endDateTime: Date = DateTimeUtil.toDateTime(endTimeValue);
    const maxStartDateTime: Date = DateTimeUtil.subtractHour(endDateTime, 1);
    this.maxStartTime = DateTimeUtil.toTimeString(maxStartDateTime);
  }

  updateMinEndTime(): void {
    const startTimeValue = this.startTimeControl?.value;
    if (!startTimeValue) {
      return;
    }
    const startDateTime: Date = DateTimeUtil.toDateTime(startTimeValue);
    const minEndDateTime: Date = DateTimeUtil.addHour(startDateTime, 1);
    this.minEndTime = DateTimeUtil.toTimeString(minEndDateTime);
  }

  get dateControl(): AbstractControl | null {
    return this.taskerAvailabilityUpdateForm.get('date');
  }

  get startTimeControl(): AbstractControl | null {
    return this.taskerAvailabilityUpdateForm.get('startTime');
  }

  get endTimeControl(): AbstractControl | null {
    return this.taskerAvailabilityUpdateForm.get('endTime');
  }

}
