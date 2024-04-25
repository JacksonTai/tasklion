import {Injectable} from '@angular/core';
import {LoginRequestModel} from "../../model/auth/login.request.model";
import {ApiUrlConstant} from "../../constants/api.url.constant";
import {ApiService} from "../api/api.service";
import {HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthResponseModel} from "../../model/auth/auth.response.model";

@Injectable({
    providedIn: 'root'
})
export class AuthService extends ApiService {

    login(loginRequestModel: LoginRequestModel): Observable<AuthResponseModel> {
        return this.post<any>(ApiUrlConstant.LOGIN, loginRequestModel, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
        });
    }

    register(registerRequestModel: LoginRequestModel) {
        return this.post<any>(ApiUrlConstant.REGISTER, registerRequestModel);
    }

    logout() {
    }

    isAuthenticated(): boolean {
        return false
    }

    getAccessToken(): string {
        // use cookie service to get access token

        return ''
    }

    getTokenType(): string {
        return ''
    }

    setAccessToken() {

    }

    removeAccessToken() {

    }



}
