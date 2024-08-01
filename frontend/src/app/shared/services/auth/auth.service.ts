import {inject, Injectable} from '@angular/core';
import {LoginRequestModel} from "../../models/auth/login-request.model";
import {ApiEndpointConstant} from "../../constants/api-endpoint.constant";
import {ApiService} from "../api/api.service";
import {HttpHeaders} from "@angular/common/http";
import {lastValueFrom, Observable, of, tap} from "rxjs";
import {CookieService} from "ngx-cookie";
import {jwtDecode} from "jwt-decode";
import {JwtPayloadModel} from "../../models/auth/jwt-payload.model";
import {ApiResponseModel} from "../../models/api/api-response.model";
import {RouteConstant} from "../../constants/route.constant";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {

  public currentRole: string = '';
  private cookieService: CookieService = inject(CookieService);

  public login(loginRequestModel: LoginRequestModel): Observable<ApiResponseModel<any>> {
    return this.post<ApiResponseModel<any>>(ApiEndpointConstant.LOGIN, loginRequestModel, {
      withCredentials: true
    });
  }

  public logout(): Observable<ApiResponseModel<any>> {
    const refreshToken: string | null = this.getRefreshToken();
    const headers = new HttpHeaders({
      'Refresh-Token': `Bearer ${refreshToken}`
    });
    return this.post(ApiEndpointConstant.LOGOUT, null, {headers, withCredentials: true})
  }

  public handleLogoutAndRedirect(): void {
    this.logout().subscribe({
      next: (): void => {
        this.cookieService.remove('access-token');
        this.cookieService.remove('refresh-token');
        window.location.href = RouteConstant.ROOT;
      }
    });
  }

  public switchRole(role: string): Observable<ApiResponseModel<any>> {
    return this.post<ApiResponseModel<any>>(ApiEndpointConstant.AUTH_SWITCH_ROLE,
      {value: role},
      {withCredentials: true}
    ).pipe(
      tap((response: ApiResponseModel<any>): void => this.handleTokenResponse(response)),
    );
  }

  public handleTokenResponse(response: ApiResponseModel<any>): void {
    if (response.data) {
      this.setAccessToken(response.data.accessToken);
      this.setRefreshToken(response.data.refreshToken);
    }
  }

  public getJwtPayload(): JwtPayloadModel | null {
    const accessToken: string | null = this.getAccessToken();
    return accessToken ? this.getDecodedToken(accessToken) : null;
  }

  public requestNewAccessToken(): Observable<any> {
    const refreshToken: string | null = this.getRefreshToken();
    const accessToken: string | null = this.getAccessToken();
    if (refreshToken && accessToken) {
      return this.post<any>(ApiEndpointConstant.AUTH_REFRESH_TOKEN, null, {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${refreshToken}`,
          'Expired-Access-Token': accessToken
        }),
      }).pipe(
        tap((response): void => this.setAccessToken(response.data.accessToken))
      );
    }
    return of(null);
  }

  public async isFullyAuthenticated(): Promise<boolean> {
    if (this.isValidAccessToken()) {
      return this.verifyTokenAsync();
    }
    return this.isValidRefreshToken();
  }

  private async verifyTokenAsync(): Promise<boolean> {
    try {
      const response: ApiResponseModel<any> = await lastValueFrom(this.verifyToken());
      return response.data;
    } catch {
      return false;
    }
  }

  public isAuthenticated(): boolean {
    return this.isValidAccessToken() || this.isValidRefreshToken();
  }

  public getAccessToken(): string | null {
    return this.cookieService.get('access-token') || null;
  }

  public setAccessToken(accessToken: string): void {
    this.cookieService.put('access-token', accessToken);
  }

  public getRefreshToken(): string | null {
    return this.cookieService.get('refresh-token') || null;
  }

  public setRefreshToken(refreshToken: string): void {
    this.cookieService.put('refresh-token', refreshToken);
  }

  public getDecodedToken(token: string): JwtPayloadModel | null {
    return token ? jwtDecode(token) : null;
  }

  public getExpiryTime(token: string): number | null {
    const decodedAccessToken: JwtPayloadModel | null = this.getDecodedToken(token);
    return decodedAccessToken && decodedAccessToken.exp !== undefined ? decodedAccessToken.exp : null;
  }

  private isValidAccessToken(): boolean {
    const accessToken: string | null = this.getAccessToken();
    return accessToken !== null && !this.isTokenExpired(accessToken);
  }

  private isValidRefreshToken(): boolean {
    const refreshToken: string | null = this.getRefreshToken();
    return refreshToken !== null && !this.isTokenExpired(refreshToken);
  }

  public isTokenExpired(token: string): boolean {
    const expiryTime: number | null = this.getExpiryTime(token);
    return expiryTime ? (expiryTime * 1000) < Date.now() : true;
  }

  public getXsrfToken(): string | undefined {
    return this.cookieService.get('XSRF-TOKEN');
  }

  verifyToken(): Observable<ApiResponseModel<any>> {
    return this.get<ApiResponseModel<boolean>>(ApiEndpointConstant.VERIFY_TOKEN);
  }
}
