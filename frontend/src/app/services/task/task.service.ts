import {Injectable} from '@angular/core';
import {ApiService} from "../../shared/services/api/api.service";
import {ApiUrlConstant} from "../../shared/constants/api-url.constant";
import {ApiResponseModel} from "../../shared/models/api/api-response.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskService extends ApiService {

  getTasks(): Observable<ApiResponseModel<any>> {
    return this.get<ApiResponseModel<any>>(ApiUrlConstant.GET_TASKS);
  }

}
