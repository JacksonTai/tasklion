import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TasklionAccountStatusConstant} from "../../../tasklion-account/constants/tasklion-account-status.constant";
import {
  ConfirmationModalComponent
} from "../../../../shared/components/modal/confirmation-modal/confirmation-modal.component";
import {
  InformationModalComponent
} from "../../../../shared/components/modal/information-modal/information-modal.component";
import {finalize, Subject} from "rxjs";
import {PaginationRequestModel} from "../../../../shared/models/pagination/pagination-request.model";
import {PaginationModel} from "../../../../shared/models/pagination/pagination.model";
import {TasklionAccountService} from "../../../tasklion-account/services/tasklion-account.service";
import {ApiResponseModel} from "../../../../shared/models/api/api-response.model";
import PaginatorUtil from "../../../../shared/utils/paginator.util";
import {RouteConstant} from 'src/app/shared/constants/route.constant';
import {TaskerModel} from "../../models/tasker.model";
import {TaskerService} from "../../services/tasker.service";

@Component({
  selector: 'tasklion-tasker-record-table',
  templateUrl: './tasker-record-table.component.html',
  styleUrls: ['./tasker-record-table.component.scss']
})
export class TaskerRecordTableComponent implements OnInit, OnDestroy {

  @ViewChild('banTaskerConfirmationModal') banConfirmationModal!: ConfirmationModalComponent;
  @ViewChild('unbanTaskerConfirmationModal') unbanConfirmationModal!: ConfirmationModalComponent;
  @ViewChild('taskerInfoModal') infoModal!: InformationModalComponent;

  protected readonly RouteConstant = RouteConstant;
  protected readonly TasklionAccountStatusConstant = TasklionAccountStatusConstant;

  protected actionCancel$: Subject<void> = new Subject<void>();
  protected isActionLoading: boolean = false;

  protected pagination: PaginationRequestModel = new PaginationRequestModel();
  protected taskers: TaskerModel[] = [];
  protected taskersPagination: PaginationModel<TaskerModel> = new PaginationModel();

  protected isLoading: boolean = false;
  protected isFetchingData: boolean = false;

  constructor(
    private taskerService: TaskerService,
    private tasklionAccountService: TasklionAccountService,
  ) {
  }

  ngOnInit(): void {
    this.fetchTaskers();
  }

  ngOnDestroy(): void {
    this.actionCancel$.next();
    this.actionCancel$.complete();
  }

  fetchTaskers(): void {
    this.isLoading = true;
    this.taskerService.getTaskers(this.pagination)
      .pipe(finalize((): boolean => this.isLoading = false))
      .subscribe({
        next: (response: ApiResponseModel<any>): void => {
          this.taskers = response.data.content;
          PaginatorUtil.mapDataToPagination(this.taskersPagination, response.data);
        }
      });
  }

  cancelAction(): void {
    this.actionCancel$.next();
    this.isActionLoading = false;
  }

  banUser(username: string): void {
    this.banConfirmationModal.message = 'Are you sure you want to ban this tasker?';
    this.banConfirmationModal.itemId = username;
    this.banConfirmationModal.open();
  }

  unbanUser(username: string): void {
    this.unbanConfirmationModal.message = 'Are you sure you want to unban this tasker?';
    this.unbanConfirmationModal.itemId = username;
    this.unbanConfirmationModal.open();
  }

  protected onPageChange(pagination: PaginationRequestModel): void {
    this.pagination = pagination;
    this.fetchTaskers();
  }

  onBanActionConfirmed(username: string): void {
    this.isActionLoading = true;
    this.tasklionAccountService.updateTasklionAccountStatus(username, TasklionAccountStatusConstant.BANNED)
      .pipe(finalize((): boolean => this.isActionLoading = false))
      .subscribe({
        next: (): void => {
          this.banConfirmationModal.close();
          this.infoModal.message = `Tasker ${username} has been banned.`;
          this.infoModal.open();
          this.fetchTaskers();
        }
      });
  }

  onUnbanActionConfirmed(username: string): void {
    this.isActionLoading = true;
    this.tasklionAccountService.updateTasklionAccountStatus(username, TasklionAccountStatusConstant.ACTIVE)
      .pipe(finalize((): boolean => this.isActionLoading = false))
      .subscribe({
        next: (): void => {
          this.unbanConfirmationModal.close();
          this.infoModal.message = `Tasker ${username} has been unbanned.`;
          this.infoModal.open();
          this.fetchTaskers();
        }
      });
  }

}
