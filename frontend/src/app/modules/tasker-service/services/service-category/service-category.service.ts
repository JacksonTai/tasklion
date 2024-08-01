import {Injectable} from '@angular/core';
import {ApiService} from "../../../../shared/services/api/api.service";
import {Observable} from "rxjs";
import {ApiResponseModel} from "../../../../shared/models/api/api-response.model";
import {ApiEndpointConstant} from "../../../../shared/constants/api-endpoint.constant";

@Injectable({
  providedIn: 'root'
})
export class ServiceCategoryService extends ApiService {

  public getTaskerServiceCategories(): Observable<ApiResponseModel<any>> {
    return this.get<ApiResponseModel<any>>(ApiEndpointConstant.SERVICE_CATEGORIES);
  }

}
