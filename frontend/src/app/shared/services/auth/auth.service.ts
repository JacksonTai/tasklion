import {inject, Injectable} from '@angular/core';
import {LoginRequestModel} from "../../model/auth/login-request.model";
import {ApiUrlConstant} from "../../constants/api-url.constant";
import {ApiService} from "../api/api.service";
import {HttpHeaders} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";
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

  registerTasker(registerRequestModel: RegisterRequestModel): Observable<ApiResponseModel<any>> {
    return this.post<RegisterRequestModel>(ApiUrlConstant.TASKER_REGISTER, registerRequestModel);
  }

  registerCustomer(registerRequestModel: RegisterRequestModel): Observable<ApiResponseModel<any>> {
    return this.post<RegisterRequestModel>(ApiUrlConstant.CUSTOMER_REGISTER, registerRequestModel);
  }

  login(loginRequestModel: LoginRequestModel): Observable<ApiResponseModel<any>> {
    return this.post<LoginRequestModel>(ApiUrlConstant.LOGIN, loginRequestModel, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    });
  }

  logout() {
    this.cookieService.remove('access-token');
    this.cookieService.remove('refresh-token');
    if (!this.getAccessToken()) {
      this.router.navigate([RouteConstant.LOGIN]);
    }
  }

  requestNewAccessToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    return this.post<any>(ApiUrlConstant.REFRESH_TOKEN, null, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${refreshToken}`
      }),
    }).pipe(
      tap((response) => {
        this.setAccessToken(response.data.accessToken);
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  isAuthenticated(): boolean {
    const refreshToken = this.getRefreshToken();
    return this.getAccessToken() !== null || (refreshToken !== null && !this.isTokenExpired(refreshToken));
  }

  getAccessToken() {
    return this.cookieService.get('access-token') || null;
  }

  setAccessToken(accessToken: string) {
    this.cookieService.put('access-token', accessToken);
  }

  getRefreshToken() {
    return this.cookieService.get('refresh-token') || null;
  }

  getDecodedToken(token: string): JwtPayloadModel | null {
    return token ? jwtDecode(token) : null;
  }

  getExpiryTime(token: string): number | null {
    const decodedAccessToken: JwtPayloadModel | null = this.getDecodedToken(token);
    return decodedAccessToken && decodedAccessToken.exp !== undefined ? decodedAccessToken.exp : null;
  }

  isTokenExpired(token: string): boolean {
    const expiryTime: number | null = this.getExpiryTime(token);
    return expiryTime ? (expiryTime * 1000) < Date.now() : true;
  }

}
