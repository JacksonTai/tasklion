import {Component} from '@angular/core';
import {TaskStatusConstant} from "../../constants/task-status.constant";
import {RouteConstant} from 'src/app/shared/constants/route.constant';
import {PaginationModel} from "../../../../shared/models/pagination/pagination.model";
import {TaskRequestModel} from "../../models/task-request.model";
import {TaskService} from "../../services/task.service";
import {AuthService} from "../../../../shared/services/auth/auth.service";
import {JwtPayloadModel} from "../../../../shared/models/auth/jwt-payload.model";
import {finalize, Observable} from "rxjs";
import {ApiResponseModel} from "../../../../shared/models/api/api-response.model";
import PaginatorUtil from "../../../../shared/utils/paginator.util";
import {PaginationRequestModel} from "../../../../shared/models/pagination/pagination-request.model";
import {TasklionUserRoleConstant} from "../../../../shared/constants/tasklion-user-role.constant";

@Component({
  selector: 'tasklion-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {

  protected readonly TasklionUserRoleConstant = TasklionUserRoleConstant;
  protected readonly TaskStatusConstant = TaskStatusConstant;
  protected readonly RouteConstant = RouteConstant;
  protected readonly taskStatus: string[] = [
    TaskStatusConstant.PENDING,
    TaskStatusConstant.SCHEDULED,
    TaskStatusConstant.PENDING_REVIEW,
    TaskStatusConstant.COMPLETED,
    TaskStatusConstant.CANCELLED,
    TaskStatusConstant.REVIEWED
  ];

  protected activeTab: string = TaskStatusConstant.PENDING;
  protected taskRequest: TaskRequestModel = { status: TaskStatusConstant.PENDING};
  protected tasksPagination: PaginationModel<any> = new PaginationModel();
  protected tasks: any[] = [];
  protected taskerUsername!: string;

  protected isTasker: boolean = false;
  protected isLoading: boolean = false;

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    const jwtPayload: JwtPayloadModel | null = this.authService.getJwtPayload();
    if (jwtPayload && jwtPayload.username && jwtPayload.currentRole) {
      this.taskerUsername = jwtPayload.username;
      this.isTasker = jwtPayload.currentRole == TasklionUserRoleConstant.TASKER;
      this.fetchTasks();
    }
  }

  private fetchTasks(): void {
    this.isLoading = true;
    const fetchTasksObservable: Observable<ApiResponseModel<any>> = this.isTasker
      ? this.taskService.getTaskerTasks(this.taskerUsername, this.taskRequest)
      : this.taskService.getCustomerTasks(this.taskerUsername, this.taskRequest);

    fetchTasksObservable
      .pipe(finalize((): boolean => this.isLoading = false))
      .subscribe({
        next: (response: ApiResponseModel<any>): void => {
          this.tasks = response.data.content;
          PaginatorUtil.mapDataToPagination(this.tasksPagination, response.data);
        }
      });
  }

  protected onPageChange(pagination: PaginationRequestModel): void {
    this.taskRequest = {...this.taskRequest, ...pagination};
    this.fetchTasks();
  }

  protected onTabChange(status: string): void {
    this.activeTab = status;
    this.taskRequest.status = status;
    this.fetchTasks();
  }

}
