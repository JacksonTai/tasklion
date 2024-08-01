import {Injectable} from '@angular/core';
import {ApiService} from "../../../../shared/services/api/api.service";
import {Observable} from "rxjs";
import {ApiResponseModel} from "../../../../shared/models/api/api-response.model";
import {ApiEndpointConstant} from "../../../../shared/constants/api-endpoint.constant";
import {TaskerAvailabilityGenericModel} from '../../models/tasker-availability-generic.model';
import {DeleteTaskerAvailabilityRequestModel} from "../../models/delete-tasker-availability-request.model";

@Injectable({
  providedIn: 'root'
})
export class TaskerAvailabilityService extends ApiService {

  public addTaskerAvailability(username: string, taskerAvailabilityGenericModel: TaskerAvailabilityGenericModel):
    Observable<ApiResponseModel<any>> {
    return this.post<ApiResponseModel<any>>(`${ApiEndpointConstant.TASKER}/${username}${ApiEndpointConstant.AVAILABILITY}`,
      taskerAvailabilityGenericModel);
  }

  public getTaskerAvailability(username: string, duration: string, excludingTaskId?: number): Observable<ApiResponseModel<any>> {
    const url: string = `${ApiEndpointConstant.TASKER}/${username}${ApiEndpointConstant.AVAILABILITY}?taskDuration=${duration}` +
      (excludingTaskId ? `&excludingTaskId=${excludingTaskId}` : '');
    return this.get<ApiResponseModel<any>>(url);
  }

  public getTaskerAvailabilityByDay(username: string): Observable<ApiResponseModel<any>> {
    return this.get<ApiResponseModel<any>>(`${ApiEndpointConstant.TASKER}/${username}${ApiEndpointConstant.AVAILABILITY_BY_DAY}`);
  }

  public getTaskerAvailabilityById(id: string, isRepeat: boolean): Observable<ApiResponseModel<any>> {
    return this.get<ApiResponseModel<any>>(`${ApiEndpointConstant.TASKER}${ApiEndpointConstant.AVAILABILITY}/${id}?isRepeat=${isRepeat}`);
  }

  public updateTaskerAvailability(id: string, taskerAvailabilityGenericModel: TaskerAvailabilityGenericModel):
    Observable<ApiResponseModel<any>> {
    return this.put<ApiResponseModel<any>>(`${ApiEndpointConstant.TASKER}${ApiEndpointConstant.AVAILABILITY}/${id}`,
      taskerAvailabilityGenericModel);
  }

  public deleteTaskerAvailability(deleteTaskerAvailabilityRequestModel: DeleteTaskerAvailabilityRequestModel):
    Observable<ApiResponseModel<any>> {
    return this.delete<ApiResponseModel<any>>(
      `${ApiEndpointConstant.TASKER}${ApiEndpointConstant.AVAILABILITY}/${deleteTaskerAvailabilityRequestModel.id}`,
      deleteTaskerAvailabilityRequestModel.repeat
    );
  }

}
