import {AfterViewInit, Component} from '@angular/core';
import {TaskerService} from "../../services/tasker.service";
import FormUtil from "../../../../shared/utils/form.util";
import {finalize} from "rxjs";
import {ApiResponseModel} from "../../../../shared/models/api/api-response.model";
import {AuthService} from "../../../../shared/services/auth/auth.service";
import {JwtPayloadModel} from "../../../../shared/models/auth/jwt-payload.model";
import {TaskerDetailModel} from "../../models/tasker-detail.model";
import {FormGroup} from "@angular/forms";
import {FormStateService} from "../../../../shared/services/form-state/form-state.service";
import {TaskerDetailFormConstant} from "../../../../shared/constants/form/tasker-detail-form.constant";
import {RouteConstant} from 'src/app/shared/constants/route.constant';

@Component({
  selector: 'tasklion-tasker-manage-account',
  templateUrl: './tasker-profile-page.component.html',
  styleUrls: ['./tasker-profile-page.component.scss']
})
export class TaskerProfilePageComponent implements AfterViewInit {

  protected readonly RouteConstant = RouteConstant;

  protected taskerDetailForm!: FormGroup;
  protected username!: string;
  protected aboutMe!: string;

  protected isLoading: boolean = false;
  protected isFetchingTaskerData: boolean = true;
  protected isUpdateSuccess: boolean = false;

  constructor(
    private taskerService: TaskerService,
    private authService: AuthService,
    private formStateService: FormStateService,
  ) {
  }

  ngAfterViewInit(): void {
    const jwtPayload: JwtPayloadModel | null = this.authService.getJwtPayload();
    if (jwtPayload && jwtPayload.username) {
      this.username = jwtPayload.username;
      this.fetchTaskerData(this.username);
    }
  }

  fetchTaskerData(username: string): void {
    this.isFetchingTaskerData = true;
    this.taskerService.getTasker(username)
      .pipe(finalize((): boolean => this.isFetchingTaskerData = false))
      .subscribe({
        next: (response: ApiResponseModel<any>): void => {
          this.aboutMe = response.data.aboutMe;
          this.initTaskerDetailForm();
        }
      });
  }

  initTaskerDetailForm(): void {
    this.formStateService.getForm(TaskerDetailFormConstant.FORM_ID).subscribe((taskerDetailForm: FormGroup): void => {
      this.taskerDetailForm = taskerDetailForm;
      this.taskerDetailForm.patchValue({
        aboutMe: this.aboutMe
      });
    });
  }

  updateTaskerProfile(): void {
    this.isUpdateSuccess = false;
    FormUtil.markAllFieldsAsDirty(this.taskerDetailForm);
    if (!this.taskerDetailForm.valid) {
      return;
    }
    this.isLoading = true;
    const taskerDetailModel: TaskerDetailModel = {
      aboutMe: this.taskerDetailForm.get('aboutMe')?.value,
    }
    this.taskerService.updateTaskerDetail(this.username, taskerDetailModel)
      .pipe(finalize((): boolean => this.isLoading = false))
      .subscribe({
        next: (): void => {
          this.isUpdateSuccess = true;
        }
      });
  }

}
