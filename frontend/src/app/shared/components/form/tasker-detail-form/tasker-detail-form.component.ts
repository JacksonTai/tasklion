import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidationMessagesModel} from "../../../models/validation-messages.model";
import {TaskerDetailFormConstant} from "../../../constants/form/tasker-detail-form.constant";
import {FormStateService} from "../../../services/form-state/form-state.service";
import {RegexConstant} from "../../../constants/regex.constant";
import {StartupService} from "../../../services/startup/startup.service";
import {ApiResponseModel} from "../../../models/api/api-response.model";

@Component({
  selector: 'tasklion-tasker-detail-form',
  templateUrl: './tasker-detail-form.component.html',
  styleUrls: ['./tasker-detail-form.component.scss']
})
export class TaskerDetailFormComponent implements OnInit, AfterViewInit {

  protected readonly validationMessages: ValidationMessagesModel = TaskerDetailFormConstant.VALIDATION_MESSAGE;
  protected taskerDetailForm!: FormGroup;
  protected cityByState: any = {};
  protected states: string[] = [];
  protected cities: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private formStateService: FormStateService,
    private startupService: StartupService,
  ) {
  }

  ngOnInit(): void {
    this.initTaskerDetailForm();
    this.getCitiesByState();

  }

  ngAfterViewInit(): void {
  }

  initTaskerDetailForm(): void {
    this.taskerDetailForm = this.formBuilder.group({
      aboutMe: new FormControl(null),
      state: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      postcode: new FormControl('', [
        Validators.required,
        Validators.pattern(RegexConstant.POSTCODE),
      ]),
      services: new FormControl([]),
    });
    this.formStateService.setForm(TaskerDetailFormConstant.FORM_ID, this.taskerDetailForm);
  }

  getCitiesByState(): void {
    this.startupService.getCityByState().subscribe({
      next: (response: ApiResponseModel<any>): void => {
        if (response.data) {
          this.cityByState = response.data
          this.states = Object.keys(this.cityByState);
        }
      }
    });
  }

  onCityChange($event: any): void {
    this.cities = this.cityByState[$event.target.value];
  }

}
