import {Injectable} from '@angular/core';
import {ApiService} from "../../../../shared/services/api/api.service";
import {Observable, Subject, takeUntil} from "rxjs";
import {ApiResponseModel} from "../../../../shared/models/api/api-response.model";
import {ApiEndpointConstant} from "../../../../shared/constants/api-endpoint.constant";
import {ServiceAreaModel} from '../models/service-area.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceAreaService extends ApiService {

  public createServiceArea(username: string, serviceAreaModel: ServiceAreaModel): Observable<ApiResponseModel<any>> {
    return this.post<ApiResponseModel<any>>(`${ApiEndpointConstant.TASKER}/${username}${ApiEndpointConstant.SERVICE_AREA}`, serviceAreaModel);
  }

  public updateServiceArea(serviceAreaId: string, serviceAreaModel: ServiceAreaModel): Observable<ApiResponseModel<any>> {
    return this.put<ApiResponseModel<any>>(`${ApiEndpointConstant.SERVICE_AREA}/${serviceAreaId}`, serviceAreaModel);
  }

  public deleteServiceArea(serviceId: string, cancel$: Subject<void>): Observable<ApiResponseModel<any>> {
    return this.delete<ApiResponseModel<any>>(`${ApiEndpointConstant.SERVICE_AREA}/${serviceId}`)
      .pipe(takeUntil(cancel$))
  }

  public getServiceAreaById(serviceAreaId: string): Observable<ApiResponseModel<any>> {
    return this.get<ApiResponseModel<any>>(`${ApiEndpointConstant.SERVICE_AREA}/${serviceAreaId}`);
  }

  public getServiceAreaOptions(username: string): Observable<ApiResponseModel<any>> {
    return this.get<ApiResponseModel<any>>(`${ApiEndpointConstant.TASKER}/${username}${ApiEndpointConstant.SERVICE_AREA}${ApiEndpointConstant.OPTIONS}`);
  }

}
