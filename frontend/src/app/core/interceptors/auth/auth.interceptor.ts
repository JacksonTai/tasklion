import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode
} from '@angular/common/http';
import {BehaviorSubject, catchError, filter, finalize, from, Observable, switchMap, take, throwError} from 'rxjs';
import {AuthService} from "../../../shared/services/auth/auth.service";
import {ApiEndpointConstant} from "../../../shared/constants/api-endpoint.constant";
import {RedirectService} from "../../../shared/services/redirect/redirect.service";
import {JwtPayloadModel} from "../../../shared/models/auth/jwt-payload.model";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private isRefreshingToken: boolean = false;
  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(
    private authService: AuthService,
    private redirectService: RedirectService,
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const isRequestingRefreshToken: boolean = request.url.includes(ApiEndpointConstant.AUTH_REFRESH_TOKEN);
    const accessToken: string | null = this.authService.getAccessToken();
    const refreshToken: string | null = this.authService.getRefreshToken();
    const xsrfToken: string | undefined = this.authService.getXsrfToken();

    if (accessToken) {
      request = this.addToken(request, 'Authorization', `Bearer ${accessToken}`);
    }

    if (accessToken && refreshToken && isRequestingRefreshToken) {
      request = this.addToken(request, 'Authorization', `Bearer ${refreshToken}`);
      request = this.addToken(request, 'Expired-Access-Token', accessToken);
    }

    if (xsrfToken) {
      request = this.addToken(request, 'X-XSRF-TOKEN', xsrfToken);
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => from(this.handleError(request, next, error)).pipe(
        switchMap((result) => result)
      ))
    );
  }

  private async handleError(request: HttpRequest<unknown>, next: HttpHandler, error: HttpErrorResponse): Promise<Observable<HttpEvent<unknown>>> {

    if (error.status === HttpStatusCode.Forbidden) {
      if (await this.authService.isFullyAuthenticated()) {
        const decodedToken: JwtPayloadModel | null = this.authService.getJwtPayload() || null;
        if (decodedToken) {
          this.redirectService.redirectOnSuccessLogin(decodedToken.currentRole);
        }
      }
      return throwError(() => error);
    }

    if (error.status === HttpStatusCode.Unauthorized) {
      const isRequestingRefreshToken: boolean = request.url.includes(ApiEndpointConstant.AUTH_REFRESH_TOKEN);
      const isRequestingPublicApi: boolean = ApiEndpointConstant.PUBLIC_API.some((api: string) => request.url.includes(api));
      if (!isRequestingRefreshToken && !isRequestingPublicApi) {
        return this.refreshToken(request, next);
      }
    }

    return throwError(() => error);
  }

  private refreshToken(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshingToken) {

      this.isRefreshingToken = true;
      this.tokenSubject.next(null);

      return this.authService.requestNewAccessToken().pipe(
        switchMap((response) => {
          const newToken: string = response.data.accessToken;
          this.tokenSubject.next(newToken);
          return next.handle(this.addToken(request, 'Authorization', `Bearer ${newToken}`));
        }),
        catchError((error: HttpErrorResponse) => {
          this.authService.handleLogoutAndRedirect();
          return throwError(() => error);
        }),
        finalize((): void => {
            this.isRefreshingToken = false;
          }
        ));

    } else {

      return this.tokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(token => {
          return next.handle(this.addToken(request, 'Authorization', `Bearer ${token}`));
        })
      );

    }
  }

  private addToken(request: HttpRequest<any>, headerName: string, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        [headerName]: token
      }
    });
  }

}
