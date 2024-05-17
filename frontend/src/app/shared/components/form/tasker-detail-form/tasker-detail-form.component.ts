import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidationMessagesModel} from "../../../models/validation-messages.model";
import {TaskerDetailFormConstant} from "../../../constants/form/tasker-detail-form.constant";
import {FormStateService} from "../../../services/form-state/form-state.service";

@Component({
  selector: 'tasklion-tasker-detail-form',
  templateUrl: './tasker-detail-form.component.html',
  styleUrls: ['./tasker-detail-form.component.scss']
})
export class TaskerDetailFormComponent implements OnInit {

  protected readonly validationMessages: ValidationMessagesModel = TaskerDetailFormConstant.VALIDATION_MESSAGE;
  protected taskerDetailForm!: FormGroup;
  protected options = {
    componentRestrictions: {country: 'MY'}
  };

  constructor(
    private formBuilder: FormBuilder,
    private formStateService: FormStateService,
  ) {
  }

  ngOnInit(): void {
    this.taskerDetailForm = this.formBuilder.group({
      aboutMe: new FormControl(null),
      address: new FormControl(null, Validators.required),
      googleMapPlaceId: new FormControl(null, Validators.required),
      services: new FormControl([]),
    });
    this.formStateService.setForm(TaskerDetailFormConstant.FORM_ID, this.taskerDetailForm);
  }

  handleAddressChange(address?: any): void {
    this.taskerDetailForm.get('googleMapPlaceId')?.setValue(address?.place_id ?? null);
  }

}
