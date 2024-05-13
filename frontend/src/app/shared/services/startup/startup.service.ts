import {Injectable} from '@angular/core';
import {ApiService} from "../api/api.service";
import {ApiUrlConstant} from "../../constants/api-url.constant";
import {Observable} from "rxjs";
import {ApiResponseModel} from "../../model/api/api-response.model";

@Injectable({
  providedIn: 'root'
})
export class StartupService extends ApiService {

  getCityByState(): Observable<ApiResponseModel<any>> {
    return this.get(ApiUrlConstant.GET_CITY_BY_STATE)
  }
}
