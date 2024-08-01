import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TaskService} from '../../services/task.service';
import {ActivatedRoute} from "@angular/router";
import {finalize, Observable, Subject} from "rxjs";
import {RouteConstant} from "../../../../shared/constants/route.constant";
import {TasklionUserRoleConstant} from 'src/app/shared/constants/tasklion-user-role.constant';
import {JwtPayloadModel} from 'src/app/shared/models/auth/jwt-payload.model';
import {AuthService} from 'src/app/shared/services/auth/auth.service';
import {
  ConfirmationModalComponent
} from "../../../../shared/components/modal/confirmation-modal/confirmation-modal.component";
import {
  InformationModalComponent
} from "../../../../shared/components/modal/information-modal/information-modal.component";
import {ApiResponseModel} from "../../../../shared/models/api/api-response.model";
import {TaskStatusConstant} from "../../constants/task-status.constant";

@Component({
  selector: 'tasklion-task-detail-page',
  templateUrl: './task-detail-page.component.html',
  styleUrls: ['./task-detail-page.component.scss']
})
export class TaskDetailPageComponent implements OnInit, OnDestroy {

  @ViewChild('confirmationModal') confirmationModal!: ConfirmationModalComponent;
  @ViewChild('infoModal') infoModal!: InformationModalComponent;

  protected readonly RouteConstant = RouteConstant;

  protected actionCancel$: Subject<void> = new Subject<void>();
  protected task: any

  protected isActionLoading: boolean = false;
  protected isFetchingData: boolean = false;
  protected isTasker: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    const jwtPayload: JwtPayloadModel | null = this.authService.getJwtPayload();
    if (jwtPayload && jwtPayload.username && jwtPayload.currentRole) {
      this.isTasker = jwtPayload.currentRole == TasklionUserRoleConstant.TASKER;
    }
    this.fetchTaskDetail();
  }

  ngOnDestroy(): void {
    this.actionCancel$.next();
    this.actionCancel$.complete();
  }

  fetchTaskDetail(): void {
    this.isFetchingData = true;
    const taskId: string | null = this.activatedRoute.snapshot.paramMap.get('taskId');
    if (taskId) {
      this.taskService.getTaskById(taskId)
        .pipe(finalize((): boolean => this.isFetchingData = false))
        .subscribe({
          next: (response: any): void => {
            this.task = response.data;
          }
        });
    }
  }

  performAction(action: string): void {
    switch (action) {
      case 'cancel':
        this.confirmationModal.message = `Are you sure you want to cancel the task?`;
        break;
      case 'reject':
        this.confirmationModal.message = 'Are you sure you want to reject the task?';
        break;
      case 'accept':
        this.confirmationModal.message = 'Are you sure you want to accept the task?';
        break;
      case 'rejectChanges':
        this.confirmationModal.message = 'Are you sure you want to reject the changes?';
        break;
      case 'acceptChanges':
        this.confirmationModal.message = 'Are you sure you want to accept the changes?';
        break;
      case 'cancelChanges':
        this.confirmationModal.message = 'Are you sure you want to cancel your changes?';
        break;
      case 'requestReview':
        this.confirmationModal.message = 'Are you sure you want to request the customer to review the task?';
        break;
      case 'complete':
        this.confirmationModal.message = 'Are you sure you want to mark this task as completed?';
        break;
      default:
        break;
    }
    this.confirmationModal.itemId = action;
    this.confirmationModal.open();
  }

  cancelAction(): void {
    this.actionCancel$.next();
    this.isActionLoading = false;
  }

  onActionConfirmed(action: string): void {
    this.isActionLoading = true;
    let taskActionObservable: Observable<ApiResponseModel<any>> | undefined;
    switch (action) {
      case "cancel":
      case "reject":
        taskActionObservable = this.taskService.updateTaskStatus(this.task.id, TaskStatusConstant.CANCELLED);
        break;
      case "requestReview":
        taskActionObservable = this.taskService.updateTaskStatus(this.task.id, TaskStatusConstant.PENDING_REVIEW);
        break;
      case "complete":
        taskActionObservable = this.taskService.updateTaskStatus(this.task.id, TaskStatusConstant.COMPLETED);
        break;
      case "accept":
        taskActionObservable = this.taskService.updateTaskStatus(this.task.id, TaskStatusConstant.SCHEDULED);
        break;
      case "cancelChanges" :
        taskActionObservable = this.taskService.cancelTaskChanges(this.task.makerCheckerId);
        break
      case "rejectChanges":
        taskActionObservable = this.taskService.rejectTaskChanges(this.task.makerCheckerId);
        break;
      case "acceptChanges":
        taskActionObservable = this.taskService.acceptTaskChanges(this.task.makerCheckerId);
        break;
      default:
        taskActionObservable = undefined;
    }

    if (taskActionObservable) {
      taskActionObservable
        .pipe(finalize((): void => {
          this.isActionLoading = false;
          this.confirmationModal.close();
        })).subscribe({
        next: (): void => {
          this.fetchTaskDetail();
        },
        error: (response): void => {
          this.infoModal.title = 'Error';
          this.infoModal.message = response.error.message;
          this.infoModal.open();
        }
      });
    } else {
      this.isActionLoading = false;
    }
  }

    protected readonly TaskStatusConstant = TaskStatusConstant;
}
