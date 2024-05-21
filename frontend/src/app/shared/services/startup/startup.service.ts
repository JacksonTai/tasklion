import {Injectable} from '@angular/core';
import {ApiService} from "../api/api.service";
import {ApiUrlConstant} from "../../constants/api-url.constant";
import {Observable} from "rxjs";
import {ApiResponseModel} from "../../models/api/api-response.model";

@Injectable({
  providedIn: 'root'
})
export class StartupService extends ApiService {

  getCityByState(): Observable<ApiResponseModel<any>> {
    return this.get(ApiUrlConstant.CITY_BY_STATE)
  }
}
