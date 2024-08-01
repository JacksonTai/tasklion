import {Injectable} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";
import {ApiEndpointConstant} from 'src/app/shared/constants/api-endpoint.constant';
import {ApiResponseModel} from 'src/app/shared/models/api/api-response.model';
import {ApiService} from 'src/app/shared/services/api/api.service';
import {HttpParams} from "@angular/common/http";
import {PaginationRequestModel} from 'src/app/shared/models/pagination/pagination-request.model';
import {AddTaskerServiceRequestModel} from '../models/add-tasker-service-request.model';
import {UpdateTaskerServiceRequestModel} from "../models/update-tasker-service-request.model";

@Injectable({
  providedIn: 'root'
})
export class TaskerServiceService extends ApiService {

  public getTaskerServicesByUsername(username: string, pagination?: PaginationRequestModel): Observable<ApiResponseModel<any>> {
    return this.get<ApiResponseModel<any>>(`${ApiEndpointConstant.TASKER}/${username}${ApiEndpointConstant.SERVICES}`,
      new HttpParams({fromObject: pagination as any}));
  }

  public getTaskerServiceById(serviceId: string): Observable<ApiResponseModel<any>> {
    return this.get<ApiResponseModel<any>>(`${ApiEndpointConstant.SERVICES}/${serviceId}`);
  }

  public createTaskerService(addTaskerServiceRequestModel: AddTaskerServiceRequestModel): Observable<ApiResponseModel<any>> {
    return this.post<ApiResponseModel<any>>(`${ApiEndpointConstant.SERVICES}`, addTaskerServiceRequestModel);
  }

  public updateTaskerService(serviceId: string,
                             updateTaskerServiceRequestModel: UpdateTaskerServiceRequestModel): Observable<ApiResponseModel<any>> {
    return this.put<ApiResponseModel<any>>(`${ApiEndpointConstant.SERVICES}/${serviceId}`, updateTaskerServiceRequestModel);
  }

  public deleteTaskerService(serviceId: string, cancel$: Subject<void>): Observable<ApiResponseModel<any>> {
    return this.delete<ApiResponseModel<any>>(`${ApiEndpointConstant.SERVICES}/${serviceId}`)
      .pipe(takeUntil(cancel$))
  }

  public getTaskerServiceAreas(username: string, pagination?: PaginationRequestModel): Observable<ApiResponseModel<any>> {
    return this.get<ApiResponseModel<any>>(`${ApiEndpointConstant.TASKER}/${username}${ApiEndpointConstant.SERVICE_AREA}`,
      new HttpParams({fromObject: pagination as any}));
  }

  public getMostOfferedServices(): Observable<ApiResponseModel<any>> {
    return this.get<ApiResponseModel<any>>(ApiEndpointConstant.MOST_OFFERED_SERVICES);
  }

}
