import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {FormStateService} from "../../../../shared/services/form-state/form-state.service";
import {TaskerAvailabilityFormConstant} from "./tasker-availability-form.constant";
import {DateConstant} from "../../../../shared/constants/date.constant";
import {TaskerAvailabilityTypeConstant} from "../../constants/tasker-availability-type.constant";
import {ValidationMessagesModel} from "../../../../shared/models/validation-messages.model";
import {DateTimeUtil} from 'src/app/shared/utils/datetime.util';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'tasklion-tasker-availability-form',
  templateUrl: './tasker-availability-form.component.html',
  styleUrls: ['./tasker-availability-form.component.scss'],
  providers: [DatePipe]
})
export class TaskerAvailabilityFormComponent implements OnInit {

  protected readonly validationMessages: ValidationMessagesModel = TaskerAvailabilityFormConstant.VALIDATION_MESSAGE;
  protected readonly TaskerAvailabilityTypeConstant = TaskerAvailabilityTypeConstant;
  protected readonly DateConstant = DateConstant;

  protected today: Date = new Date();
  protected minDate: Date = this.today.getHours() >= 21 ? DateTimeUtil.addDays(this.today, 1) : this.today;
  protected maxDate: Date = DateTimeUtil.addDays(this.today, 14);
  protected taskerAvailabilityForm!: FormGroup;

  constructor(
    private formStateService: FormStateService,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.initTaskerAvailabilityForm();
  }

  initTaskerAvailabilityForm(): void {
    this.taskerAvailabilityForm = this.formBuilder.group({
      availabilityType: new FormControl(TaskerAvailabilityTypeConstant.DATE),
      date: new FormControl(null, Validators.required),
      days: this.formBuilder.array([]),
      startTime: new FormControl(null, [
        Validators.required,
      ]),
      endTime: new FormControl(null, [
        Validators.required,
      ])
    });
    this.onAvailabilityTypeChange();
    this.formStateService.setForm(TaskerAvailabilityFormConstant.FORM_ID, this.taskerAvailabilityForm);
  }

  onAvailabilityTypeChange(): void {
    this.taskerAvailabilityForm.get('availabilityType')?.valueChanges.subscribe(type => {
      switch (type) {
        case TaskerAvailabilityTypeConstant.DATE:
          this.dateControl?.setValidators(Validators.required);
          this.daysControl?.clearValidators();
          this.daysControl.clear();
          break;
        case TaskerAvailabilityTypeConstant.REPEAT:
          this.dateControl?.clearValidators();
          this.dateControl?.setValue(null);
          this.daysControl?.setValidators((control: AbstractControl): ValidationErrors | null => {
            return control.value.length > 0 ? null : {required: true};
          });
          break;
      }
      this.dateControl?.updateValueAndValidity();
      this.daysControl?.updateValueAndValidity();
    });
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
          startTimeControl?.setValue(DateTimeUtil.toTimeString(roundedTime));
          endTimeControl?.setValue(null);
        }
      }
      if (currentTime.getHours() >= 21) {
        this.dateControl?.setValue(DateTimeUtil.addDays(currentTime, 1));
      }
    }
  }

  onDayChange(day: string, event: Event): void {
    const checkbox: HTMLInputElement = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.daysControl.push(this.formBuilder.control(day));
    } else {
      const index: number = this.daysControl.controls.findIndex(x => x.value === day);
      this.daysControl.removeAt(index);
    }
    this.daysControl.markAsTouched();
    this.daysControl.updateValueAndValidity();
  }

  getMinStartTime(): string {
    const currentTime: Date = new Date();
    const selectedDateValue: Date = this.dateControl?.value;
     if (selectedDateValue && selectedDateValue.toDateString() === currentTime.toDateString()) {
      const roundedTime: Date = DateTimeUtil.roundMinutes(currentTime, 15);
      return DateTimeUtil.toTimeString(roundedTime);
    } else {
      const sixAm: Date = new Date();
      sixAm.setHours(6, 0, 0, 0);
      return DateTimeUtil.toTimeString(sixAm);
    }
  }

  getMinEndTime(): string {
    const startTimeValue = this.startTimeControl?.value;
    if (!startTimeValue) {
      return '';
    }
    const startDateTime: Date = DateTimeUtil.toDateTime(startTimeValue);
    const minEndDateTime: Date = DateTimeUtil.addHour(startDateTime, 1);
    return DateTimeUtil.toTimeString(minEndDateTime);
  }

  get daysControl(): FormArray {
    return this.taskerAvailabilityForm.get('days') as FormArray;
  }

  get dateControl(): AbstractControl | null {
    return this.taskerAvailabilityForm.get('date');
  }

  get startTimeControl(): AbstractControl | null {
    return this.taskerAvailabilityForm.get('startTime');
  }

  get endTimeControl(): AbstractControl | null {
    return this.taskerAvailabilityForm.get('endTime');
  }

}
