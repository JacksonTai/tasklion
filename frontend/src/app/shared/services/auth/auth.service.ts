import {inject, Injectable} from '@angular/core';
import {LoginRequestModel} from "../../models/auth/login-request.model";
import {ApiUrlConstant} from "../../constants/api-url.constant";
import {ApiService} from "../api/api.service";
import {HttpHeaders} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";
import {CookieService} from "ngx-cookie";
import {Router} from "@angular/router";
import {RouteConstant} from "../../constants/route.constant";
import {jwtDecode} from "jwt-decode";
import {JwtPayloadModel} from "../../models/auth/jwt-payload.model";
import {ApiResponseModel} from "../../models/api/api-response.model";
import {CustomerModel} from "../../models/customer.model";
import {TaskerModel} from "../../models/tasker.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {

  private cookieService: CookieService = inject(CookieService);
  private router: Router = inject(Router);

  login(loginRequestModel: LoginRequestModel): Observable<ApiResponseModel<any>> {
    return this.post<LoginRequestModel>(ApiUrlConstant.LOGIN, loginRequestModel).pipe(
      tap((response: ApiResponseModel<any>) => this.handleTokenResponse(response)),
    );
  }

  logout(): void {
    this.cookieService.remove('access-token');
    this.cookieService.remove('refresh-token');
    if (!this.getAccessToken()) {
      this.router.navigate([RouteConstant.LOGIN]);
    }
  }

  registerTasker(taskerModel: TaskerModel): Observable<ApiResponseModel<any>> {
    return this.register(ApiUrlConstant.TASKER_REGISTER, taskerModel);
  }

  registerCustomer(customerModel: CustomerModel): Observable<ApiResponseModel<any>> {
    return this.register(ApiUrlConstant.CUSTOMER_REGISTER, customerModel);
  }

  private register(url: string, data: any): Observable<any> {
    return this.post(url, data).pipe(
      tap(response => this.handleTokenResponse(response))
    );
  }

  private handleTokenResponse(response: any) {
    this.setRefreshToken(response.data.refreshToken);
    this.setAccessToken(response.data.accessToken);
  }

  requestNewAccessToken(): Observable<any> {
    const refreshToken: string | null = this.getRefreshToken();
    return this.post<any>(ApiUrlConstant.GET_REFRESH_TOKEN, null, {
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
    const refreshToken: string | null = this.getRefreshToken();
    return this.getAccessToken() !== null || (refreshToken !== null && !this.isTokenExpired(refreshToken));
  }

  getAccessToken(): string | null {
    return this.cookieService.get('access-token') || null;
  }

  setAccessToken(accessToken: string): void {
    this.cookieService.put('access-token', accessToken);
  }

  getRefreshToken(): string | null {
    return this.cookieService.get('refresh-token') || null;
  }

  setRefreshToken(refreshToken: string): void {
    this.cookieService.put('refresh-token', refreshToken);
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
