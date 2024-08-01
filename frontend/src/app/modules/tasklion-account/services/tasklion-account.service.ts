import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {ApiEndpointConstant} from 'src/app/shared/constants/api-endpoint.constant';
import {ApiResponseModel} from 'src/app/shared/models/api/api-response.model';
import {KeyValueModel} from 'src/app/shared/models/key-value.model';
import {ApiService} from 'src/app/shared/services/api/api.service';
import {TasklionAccountDetailModel} from "../models/tasklion-account-detail.model";

@Injectable({
  providedIn: 'root'
})
export class TasklionAccountService extends ApiService {

  public isExists(fieldValueModel: KeyValueModel): Observable<ApiResponseModel<any>> {
    return this.post<ApiResponseModel<any>>(ApiEndpointConstant.IS_TASKLION_ACCOUNT_EXISTS, fieldValueModel);
  }

  public getTasklionAccount(username: string): Observable<ApiResponseModel<any>> {
    return this.get<ApiResponseModel<any>>(`${ApiEndpointConstant.TASKLION_ACCOUNT}/${username}`);
  }

  public updateTasklionAccount(username: string, tasklionAccountDetail: TasklionAccountDetailModel): Observable<ApiResponseModel<any>> {
    return this.put<ApiResponseModel<any>>(`${ApiEndpointConstant.TASKLION_ACCOUNT}/${username}`, tasklionAccountDetail);
  }

  public changePassword(username: string, changePasswordModel: KeyValueModel): Observable<ApiResponseModel<any>> {
    return this.post<ApiResponseModel<any>>(`${ApiEndpointConstant.CHANGE_PASSWORD}/${username}`, changePasswordModel);
  }

  public updateTasklionAccountStatus(username: string, status: string): Observable<ApiResponseModel<any>> {
    return this.put<ApiResponseModel<any>>(`${ApiEndpointConstant.TASKLION_ACCOUNT}/${username}${ApiEndpointConstant.STATUS}`, status);
  }

}
