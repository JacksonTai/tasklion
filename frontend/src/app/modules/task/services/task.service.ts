import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {ApiEndpointConstant} from 'src/app/shared/constants/api-endpoint.constant';
import {ApiResponseModel} from 'src/app/shared/models/api/api-response.model';
import {ApiService} from 'src/app/shared/services/api/api.service';
import {HttpParams} from "@angular/common/http";
import {TaskRequestModel} from "../models/task-request.model";
import {CommonTaskRequestModel} from "../models/common-task-request.model";

@Injectable({
  providedIn: 'root'
})
export class TaskService extends ApiService {

  getCustomerTasks(username: string, taskRequest?: TaskRequestModel): Observable<ApiResponseModel<any>> {
    return this.get<ApiResponseModel<any>>(`${ApiEndpointConstant.CUSTOMER}/${username}${ApiEndpointConstant.TASKS}`,
      new HttpParams({fromObject: taskRequest as any}));
  }

  getTaskerTasks(username: string, taskRequest?: TaskRequestModel): Observable<ApiResponseModel<any>> {
    return this.get<ApiResponseModel<any>>(`${ApiEndpointConstant.TASKER}/${username}${ApiEndpointConstant.TASKS}`,
      new HttpParams({fromObject: taskRequest as any}));
  }

  getTaskById(taskId: string, isUpdateView?: boolean): Observable<ApiResponseModel<any>> {
    return this.get<ApiResponseModel<any>>(`${ApiEndpointConstant.TASKS}/${taskId}`,
      new HttpParams({fromObject: {isUpdateView: Boolean(isUpdateView)}}));
  }

  getTaskCountByStatus(): Observable<ApiResponseModel<any>> {
    return this.get<ApiResponseModel<any>>(`${ApiEndpointConstant.TASKS}${ApiEndpointConstant.COUNT_BY_STATUS}`);
  }

  createTask(username: string, createTaskRequestModel: CommonTaskRequestModel): Observable<ApiResponseModel<any>> {
    return this.post<ApiResponseModel<any>>(`${ApiEndpointConstant.TASKER}/${username}${ApiEndpointConstant.TASKS}`, createTaskRequestModel);
  }

  updateTask(taskId: string, commonTaskRequestModel: CommonTaskRequestModel): Observable<ApiResponseModel<any>> {
    return this.put<ApiResponseModel<any>>(`${ApiEndpointConstant.TASKS}/${taskId}`, commonTaskRequestModel);
  }

  updateTaskStatus(taskId: string, status: string): Observable<ApiResponseModel<any>> {
    return this.put<ApiResponseModel<any>>(`${ApiEndpointConstant.TASKS}/${taskId}${ApiEndpointConstant.STATUS}`, status);
  }

  cancelTaskChanges(makerCheckerId: string): Observable<ApiResponseModel<any>> {
    return this.put<ApiResponseModel<any>>(`${ApiEndpointConstant.TASKS}${ApiEndpointConstant.CANCEL}`, makerCheckerId);
  }

  acceptTaskChanges(makerCheckerId: string): Observable<ApiResponseModel<any>> {
    return this.put<ApiResponseModel<any>>(`${ApiEndpointConstant.TASKS}${ApiEndpointConstant.ACCEPT}`, makerCheckerId);
  }

  rejectTaskChanges(makerCheckerId: string): Observable<ApiResponseModel<any>> {
    return this.put<ApiResponseModel<any>>(`${ApiEndpointConstant.TASKS}${ApiEndpointConstant.REJECT}`, makerCheckerId);
  }

}
