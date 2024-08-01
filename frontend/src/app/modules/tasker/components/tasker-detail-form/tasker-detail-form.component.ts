import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TaskerDetailFormConstant} from 'src/app/shared/constants/form/tasker-detail-form.constant';
import {RouteConstant} from 'src/app/shared/constants/route.constant';
import {ValidationMessagesModel} from 'src/app/shared/models/validation-messages.model';
import {FormStateService} from 'src/app/shared/services/form-state/form-state.service';

@Component({
  selector: 'tasklion-tasker-detail-form',
  templateUrl: './tasker-detail-form.component.html',
  styleUrls: ['./tasker-detail-form.component.scss']
})
export class TaskerDetailFormComponent implements OnInit {

  protected readonly RouteConstant = RouteConstant;
  protected taskerDetailValidationMessage: ValidationMessagesModel = TaskerDetailFormConstant.VALIDATION_MESSAGE;
  protected taskerDetailForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private formStateService: FormStateService,
  ) {
  }

  ngOnInit(): void {
    this.initTaskerDetailForm();
  }

  initTaskerDetailForm(): void {
    this.taskerDetailForm = this.formBuilder.group({
      aboutMe: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.maxLength(250)
        ]
      }),
    });
    this.formStateService.setForm(TaskerDetailFormConstant.FORM_ID, this.taskerDetailForm);
  }

}
