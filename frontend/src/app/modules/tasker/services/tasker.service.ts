import {inject, Injectable} from '@angular/core';
import {Observable, tap} from "rxjs";
import {ApiService} from 'src/app/shared/services/api/api.service';
import {AuthService} from 'src/app/shared/services/auth/auth.service';
import {ApiResponseModel} from 'src/app/shared/models/api/api-response.model';
import {ApiEndpointConstant} from "../../../shared/constants/api-endpoint.constant";
import {TaskerSetupModel} from "../models/tasker-setup.model";
import {TaskerModel} from "../models/tasker.model";
import {TaskerDetailModel} from "../models/tasker-detail.model";
import {SearchTaskerRequestModel} from "../../customer/models/search-tasker-request.model";
import {HttpParams} from "@angular/common/http";
import {PaginationRequestModel} from "../../../shared/models/pagination/pagination-request.model";


@Injectable({
  providedIn: 'root'
})
export class TaskerService extends ApiService {

  authService: AuthService = inject(AuthService);

  public getTaskers(pagination: PaginationRequestModel): Observable<ApiResponseModel<any>> {
    return this.get<ApiResponseModel<any>>(ApiEndpointConstant.TASKER, new HttpParams({fromObject: pagination as any}));
  }

  public getTasker(username: string): Observable<ApiResponseModel<any>> {
    return this.get<ApiResponseModel<any>>(`${ApiEndpointConstant.TASKER}/${username}`);
  }

  public getRatingByUsername(username: string): Observable<ApiResponseModel<any>> {
    return this.get<ApiResponseModel<any>>(`${ApiEndpointConstant.TASKER}/${username}/${ApiEndpointConstant.RATING}`);
  }

  public getTaskerCount(): Observable<ApiResponseModel<any>> {
    return this.get<ApiResponseModel<any>>(`${ApiEndpointConstant.TASKER}${ApiEndpointConstant.COUNT}`);
  }

  public registerTasker(taskerModel: TaskerModel): Observable<ApiResponseModel<any>> {
    return this.post<ApiResponseModel<any>>(ApiEndpointConstant.TASKER_REGISTER, taskerModel, {
      withCredentials: true
    }).pipe(
      tap((response: ApiResponseModel<any>) => this.authService.handleTokenResponse(response))
    );
  }

  public setupTasker(taskerSetupModel: TaskerSetupModel): Observable<ApiResponseModel<any>> {
    return this.post<ApiResponseModel<any>>(ApiEndpointConstant.TASKER_SETUP, taskerSetupModel).pipe(
      tap((response: ApiResponseModel<any>) => this.authService.handleTokenResponse(response))
    );
  }

  public updateTaskerDetail(username: string, taskerDetailModel: TaskerDetailModel): Observable<ApiResponseModel<any>> {
    return this.put<ApiResponseModel<any>>(`${ApiEndpointConstant.TASKER}/${username}`, taskerDetailModel);
  }

  public searchTasker(searchTaskerRequest: SearchTaskerRequestModel): Observable<ApiResponseModel<any>> {
    return this.get<ApiResponseModel<any>>(`${ApiEndpointConstant.TASKER}${ApiEndpointConstant.SEARCH}`,
      new HttpParams({fromObject: searchTaskerRequest as any}));
  }

}
