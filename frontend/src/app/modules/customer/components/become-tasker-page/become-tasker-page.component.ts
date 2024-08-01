import {Component, ViewChild} from '@angular/core';
import {finalize} from "rxjs";
import {RouteConstant} from 'src/app/shared/constants/route.constant';
import {TaskerService} from "../../../tasker/services/tasker.service";
import FormUtil from "src/app/shared/utils/form.util";
import {TaskerSetupModel} from 'src/app/modules/tasker/models/tasker-setup.model';

@Component({
  selector: 'tasklion-become-tasker-page',
  templateUrl: './become-tasker-page.component.html',
  styleUrls: ['./become-tasker-page.component.scss']
})
export class BecomeTaskerPageComponent {

  @ViewChild('taskerDetailFormComponent')
  protected taskerDetailFormComponent: any;

  protected readonly RouteConstant = RouteConstant;
  protected isLoading: boolean = false;

  constructor(
    private taskerService: TaskerService,
  ) {
  }

  public setupTasker(): void {
    FormUtil.markAllFieldsAsDirty(this.taskerDetailFormComponent.taskerDetailForm);
    if (!this.taskerDetailFormComponent.taskerDetailForm.valid ) {
      return;
    }
    this.isLoading = true;
    const taskerSetupModel: TaskerSetupModel = {
      aboutMe: this.taskerDetailFormComponent.taskerDetailForm.get('aboutMe')?.value,
      serviceAreas: [],
      services: []
    }
    this.taskerService.setupTasker(taskerSetupModel).pipe(
      finalize((): boolean => this.isLoading = false)
    ).subscribe({
      next: () => window.location.href = RouteConstant.TASKER_DASHBOARD
    });
  }

}
