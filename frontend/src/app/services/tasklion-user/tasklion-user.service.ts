import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {ApiService} from "../../shared/services/api/api.service";
import {ApiUrlConstant} from "../../shared/constants/api-url.constant";
import {FieldValueModel} from "../../shared/models/field-value.model";
import {ApiResponseModel} from "../../shared/models/api/api-response.model";

@Injectable({
  providedIn: 'root'
})
export class TasklionUserService extends ApiService {

  public isExists(fieldValueModel: FieldValueModel): Observable<ApiResponseModel<any>> {
    return this.post<ApiResponseModel<any>>(ApiUrlConstant.IS_TASKLION_USER_EXISTS, fieldValueModel);
  }

}
