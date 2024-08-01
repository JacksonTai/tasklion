import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TaskerAvailabilityService} from '../../services/tasker-availability/tasker-availability.service';
import {AuthService} from 'src/app/shared/services/auth/auth.service';
import {finalize, Subject} from 'rxjs';
import {ApiResponseModel} from 'src/app/shared/models/api/api-response.model';
import {TaskerAvailabilityDetailModel} from "../../models/tasker-availability-detail-model";
import {
  ConfirmationModalComponent
} from "../../../../shared/components/modal/confirmation-modal/confirmation-modal.component";
import {
  InformationModalComponent
} from "../../../../shared/components/modal/information-modal/information-modal.component";
import {DeleteTaskerAvailabilityRequestModel} from "../../models/delete-tasker-availability-request.model";
import {RouteConstant} from "../../../../shared/constants/route.constant";

@Component({
  selector: 'tasklion-tasker-availability-list',
  templateUrl: './tasker-manage-availability-list.component.html',
  styleUrls: ['./tasker-manage-availability-list.component.scss']
})
export class TaskerManageAvailabilityListComponent implements OnInit, OnDestroy {

  @ViewChild('deleteModal') deleteModal!: ConfirmationModalComponent;
  @ViewChild('infoModal') infoModal!: InformationModalComponent;

  protected readonly Object = Object;

  protected username: string | undefined;
  protected days: { [key: string]: TaskerAvailabilityDetailModel[] } = {};
  protected isFetchingData: boolean = true;
  protected isDeleting: boolean = false;
  protected deleteCancel$: Subject<void> = new Subject<void>();

  constructor(
    private taskerAvailabilityService: TaskerAvailabilityService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.initUsername();
    this.fetchTaskerAvailability();
  }

  ngOnDestroy(): void {
    this.deleteCancel$.next();
    this.deleteCancel$.complete();
  }

  initUsername(): void {
    this.username = this.authService.getJwtPayload()?.username;
  }

  fetchTaskerAvailability(): void {
    if (this.username) {
      this.taskerAvailabilityService.getTaskerAvailabilityByDay(this.username)
        .pipe(finalize((): boolean => this.isFetchingData = false))
        .subscribe({
          next: (response: ApiResponseModel<any>): void => {
            this.days = response.data;
          }
        });
    }
  }

  deleteAvailability(availabilityId: number, availabilityRepeat: boolean): void {
    this.deleteModal.itemId = {id: availabilityId, repeat: availabilityRepeat};
    this.deleteModal.message = 'Are you sure you want to delete this availability?';
    this.deleteModal.open();
  }

  cancelDelete(): void {
    this.deleteCancel$.next();
    this.isDeleting = false;
  }

  onDeleteConfirmed(deleteRequestModel: DeleteTaskerAvailabilityRequestModel): void {
    this.isDeleting = true;
    this.taskerAvailabilityService.deleteTaskerAvailability(deleteRequestModel)
      .pipe(finalize((): void => {
        this.isDeleting = false;
        this.deleteModal.close();
      }))
      .subscribe({
        next: (): void => {
          this.fetchTaskerAvailability();
        },
        error: (response): void => {
          this.infoModal.title = 'Error';
          this.infoModal.message = response.error.message;
          this.infoModal.open();
        }
      });
  }

  protected readonly RouteConstant = RouteConstant;
}
