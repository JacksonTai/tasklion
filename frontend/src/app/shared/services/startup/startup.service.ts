import {Injectable} from '@angular/core';
import {ApiService} from "../api/api.service";
import {ApiEndpointConstant} from "../../constants/api-endpoint.constant";
import {Observable} from "rxjs";
import {ApiResponseModel} from "../../models/api/api-response.model";

@Injectable({
  providedIn: 'root'
})
export class StartupService extends ApiService {

  getCityByState(): Observable<ApiResponseModel<any>> {
    return this.get(ApiEndpointConstant.CITY_BY_STATE)
  }

}
