import {Injectable} from '@angular/core';
import {LoginRequestModel} from "../../model/login.request.model";
import {ApiUrlConstant} from "../../constants/api.url.constant";
import {ApiService} from "../api/api.service";
import {HttpHeaders} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class AuthService extends ApiService {

    login(loginRequestModel: LoginRequestModel) {
        return this.post<any>(ApiUrlConstant.LOGIN, loginRequestModel, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            withCredentials: true,
            observe: 'response',
        });
    }

    register(registerRequestModel: LoginRequestModel) {
        return this.post<any>(ApiUrlConstant.REGISTER, registerRequestModel);
    }
}
