import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode
} from '@angular/common/http';
import {catchError, Observable, switchMap, throwError} from 'rxjs';
import {AuthService} from "../../shared/services/auth/auth.service";
import {ApiUrlConstant} from "../../shared/constants/api-url.constant";
import {Router} from "@angular/router";
import {RouteConstant} from "../../shared/constants/route.constant";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isRequestingRefreshToken: boolean = request.url.includes(ApiUrlConstant.GET_REFRESH_TOKEN);
    const accessToken: string | null = this.authService.getAccessToken();
    if (accessToken) {
      request = this.addToken(request, accessToken);
    }
    const refreshToken: string | null = this.authService.getRefreshToken();
    if (refreshToken && isRequestingRefreshToken) {
      request = this.addToken(request, refreshToken);
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Forbidden) {
          this.router.navigate([RouteConstant.DASHBOARD]);
          return throwError(() => error);
        }
        if (error.status === HttpStatusCode.Unauthorized && !isRequestingRefreshToken) {
          // If the request is a public API, do not refresh the token
          if (ApiUrlConstant.PUBLIC_API.some((api: string) => request.url.includes(api))) {
            return throwError(() => error);
          }
          return this.refreshToken(request, next);
        }
        this.authService.logout();
        return throwError(() => error);
      })
    );
  }

  private refreshToken(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.requestNewAccessToken().pipe(
      switchMap(() => {
        const newAccessToken = this.authService.getAccessToken();
        if (newAccessToken) {
          request = this.addToken(request, newAccessToken);
          return next.handle(request);
        }
        this.authService.logout();
        return throwError(() => new Error('Access token is null'));
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

}