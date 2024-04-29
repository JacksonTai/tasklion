import {inject, Injectable} from '@angular/core';
import {LoginRequestModel} from "../../model/auth/login-request.model";
import {ApiUrlConstant} from "../../constants/api-url.constant";
import {ApiService} from "../api/api.service";
import {HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {CookieService} from "ngx-cookie";
import {Router} from "@angular/router";
import {RouteConstant} from "../../constants/route.constant";
import {jwtDecode} from "jwt-decode";
import {JwtPayloadModel} from "../../model/auth/jwt-payload.model";
import {ApiResponseModel} from "../../model/api/api-response.model";
import {RegisterRequestModel} from "../../model/auth/register-request.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {

  private cookieService: CookieService = inject(CookieService);
  private router: Router = inject(Router);

  register(registerRequestModel: RegisterRequestModel): Observable<ApiResponseModel<any>> {
    return this.post<RegisterRequestModel>(ApiUrlConstant.REGISTER, registerRequestModel);
  }

  login(loginRequestModel: LoginRequestModel): Observable<ApiResponseModel<any>> {
    return this.post<LoginRequestModel>(ApiUrlConstant.LOGIN, loginRequestModel, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    });
  }

  logout() {
    // TODO: Make Authorization as a constant
    this.cookieService.remove('Authorization');
    if (!this.getAccessToken()) {
      this.router.navigate([RouteConstant.LOGIN]);
    }
  }

  isAuthenticated(): boolean {
    return this.isTokenValid() && !this.isTokenExpired();
  }

  getAccessToken(): string | null {
    return this.cookieService.get('Authorization') || null;
  }

  getDecodedAccessToken(): JwtPayloadModel | null {
    const accessToken = this.getAccessToken();
    return accessToken ? jwtDecode(accessToken) : null;
  }

  getExpiryTime(): number | null {
    const decodedAccessToken: JwtPayloadModel | null = this.getDecodedAccessToken();
    return decodedAccessToken && decodedAccessToken.exp !== undefined ? decodedAccessToken.exp : null;
  }

  isTokenValid(): boolean {
    return this.getAccessToken() !== null;
  }

  isTokenExpired(): boolean {
    const expiryTime: number | null = this.getExpiryTime();
    return expiryTime ? (expiryTime * 1000) < Date.now() : true;
  }

}
