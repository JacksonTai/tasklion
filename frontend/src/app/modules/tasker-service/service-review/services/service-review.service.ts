import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {ApiEndpointConstant} from 'src/app/shared/constants/api-endpoint.constant';
import {ApiResponseModel} from 'src/app/shared/models/api/api-response.model';
import {PaginationRequestModel} from 'src/app/shared/models/pagination/pagination-request.model';
import {ApiService} from 'src/app/shared/services/api/api.service';
import {AddServiceReviewRequestModel} from "../models/add-service-review-request.model";

@Injectable({
  providedIn: 'root'
})
export class ServiceReviewService extends ApiService {

  public getServiceReview(serviceId: number, pagination?: PaginationRequestModel): Observable<ApiResponseModel<any>> {
    return this.post<ApiResponseModel<any>>(`${ApiEndpointConstant.SERVICE_REVIEW}/${serviceId}`, pagination);
  }

  public addServiceReview(addServiceReviewRequestModel: AddServiceReviewRequestModel) : Observable<ApiResponseModel<any>> {
    return this.post<ApiResponseModel<any>>(`${ApiEndpointConstant.SERVICE_REVIEW}`, addServiceReviewRequestModel);
  }

}
