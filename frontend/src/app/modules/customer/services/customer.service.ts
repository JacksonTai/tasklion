import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {ApiService} from 'src/app/shared/services/api/api.service';
import {CustomerModel} from '../models/customer.model';
import {ApiResponseModel} from 'src/app/shared/models/api/api-response.model';
import {ApiEndpointConstant} from 'src/app/shared/constants/api-endpoint.constant';
import {HttpParams} from "@angular/common/http";
import {PaginationRequestModel} from "../../../shared/models/pagination/pagination-request.model";

@Injectable({
  providedIn: 'root'
})
export class CustomerService  extends ApiService {


  public getCustomers(pagination: PaginationRequestModel): Observable<ApiResponseModel<any>> {
    return this.get<ApiResponseModel<any>>(ApiEndpointConstant.CUSTOMER, new HttpParams({fromObject: pagination as any}));
  }

  public getCustomer(username: string): Observable<ApiResponseModel<any>> {
    return this.get<ApiResponseModel<any>>(`${ApiEndpointConstant.CUSTOMER}/${username}`);
  }

  public getCustomerCount(): Observable<ApiResponseModel<any>> {
    return this.get<ApiResponseModel<any>>(`${ApiEndpointConstant.CUSTOMER}${ApiEndpointConstant.COUNT}`);
  }

  public registerCustomer(customerModel: CustomerModel): Observable<ApiResponseModel<any>> {
    return this.post<ApiResponseModel<any>>(ApiEndpointConstant.CUSTOMER_REGISTER, customerModel, {
      withCredentials: true
    });
  }

}
