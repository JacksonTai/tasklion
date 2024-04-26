import {inject, Injectable} from '@angular/core';
import {LoginRequestModel} from "../../model/auth/login.request.model";
import {ApiUrlConstant} from "../../constants/api.url.constant";
import {ApiService} from "../api/api.service";
import {HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthResponseModel} from "../../model/auth/auth.response.model";
import {CookieService} from "ngx-cookie";
import {Router} from "@angular/router";
import {RouteConstant} from "../../constants/route.constant";
import {jwtDecode, JwtPayload} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {

  private cookieService: CookieService = inject(CookieService);
  private router: Router = inject(Router);

  register(registerRequestModel: LoginRequestModel) {
    return this.post<any>(ApiUrlConstant.REGISTER, registerRequestModel);
  }

  login(loginRequestModel: LoginRequestModel): Observable<AuthResponseModel> {
    return this.post<any>(ApiUrlConstant.LOGIN, loginRequestModel, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    });
  }

  logout() {
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

  getDecodedAccessToken(): JwtPayload | null {
    const accessToken = this.getAccessToken();
    return accessToken ? jwtDecode(accessToken) : null;
  }

  getExpiryTime(): number | null {
    const decodedAccessToken = this.getDecodedAccessToken();
    return decodedAccessToken && decodedAccessToken.exp !== undefined ? decodedAccessToken.exp : null;
  }

  isTokenValid(): boolean {
    return this.getAccessToken() !== null;
  }

  isTokenExpired(): boolean {
    const expiryTime = this.getExpiryTime();
    return expiryTime ? (expiryTime * 1000) < Date.now() : true;
  }

}
