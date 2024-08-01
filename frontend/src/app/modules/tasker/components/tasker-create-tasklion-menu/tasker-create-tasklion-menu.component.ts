import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {CdkStepper} from "@angular/cdk/stepper";
import {FormGroup} from "@angular/forms";
import {finalize} from "rxjs";

import {Router} from "@angular/router";
import {RouteConstant} from 'src/app/shared/constants/route.constant';
import FormUtil from 'src/app/shared/utils/form.util';
import {TaskerModel} from '../../models/tasker.model';
import {TaskerService} from '../../services/tasker.service';

@Component({
  selector: 'tasklion-tasker-registration-form',
  templateUrl: './tasker-create-tasklion-menu.component.html',
  styleUrls: ['./tasker-create-tasklion-menu.component.scss'],
})
export class TaskerCreateTasklionMenuComponent implements AfterViewInit {

  @ViewChild('stepper')
  stepper?: CdkStepper;

  @ViewChild('accountDetailFormComponent')
  accountDetailFormComponent?: any;

  @ViewChild('personalDetailFormComponent')
  personalDetailFormComponent?: any;

  @ViewChild('taskerDetailFormComponent')
  taskerDetailFormComponent?: any;

  protected readonly RouteConstant = RouteConstant;
  protected personalDetailForm!: FormGroup;
  protected accountDetailForm!: FormGroup;
  protected taskerDetailForm!: FormGroup;
  protected isLoading: boolean = false;

  constructor(
    private taskerService: TaskerService,
    private router: Router,
  ) {
  }

  ngAfterViewInit(): void {
    this.personalDetailForm = this.personalDetailFormComponent.personalDetailForm;
    this.accountDetailForm = this.accountDetailFormComponent.accountDetailForm;
    this.taskerDetailForm = this.taskerDetailFormComponent.taskerDetailForm;
  }

  goBack(): void {
    this.stepper?.previous();
  }

  goNext(): void {
    switch (this.stepper?.selectedIndex) {
      case 0:
        FormUtil.markAllFieldsAsDirty(this.personalDetailForm);
        if (this.personalDetailForm.valid) {
          this.stepper?.next();
        }
        break;
      case 1:
        FormUtil.markAllFieldsAsDirty(this.accountDetailForm);
        if (this.accountDetailForm.valid) {
          this.stepper?.next();
        }
        break;
    }
  }

  submit(): void {
    FormUtil.markAllFieldsAsDirty(this.taskerDetailForm);
    if (this.taskerDetailForm.valid) {
      const taskerModel: TaskerModel = {
        personalDetail: this.personalDetailForm.value,
        tasklionAccount: this.accountDetailForm.value,
        aboutMe: this.taskerDetailForm.get('aboutMe')?.value,
        serviceAreas: [],
        services: []
      }
      this.isLoading = true;
      this.taskerService.registerTasker(taskerModel).pipe(
        finalize((): boolean => this.isLoading = false)
      ).subscribe({
        next: (): void => {
          window.location.href = RouteConstant.TASKER_DASHBOARD;
        },
        error: (): void => {
          this.router.navigate([RouteConstant.INTERNAL_SERVER_ERROR], {skipLocationChange: true});
        }
      })
    }
  }

}
