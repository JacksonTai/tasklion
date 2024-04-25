import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from "../shared/services/auth/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = this.authService.getAccessToken();
    const tokenType = this.authService.getTokenType();
    if (accessToken && tokenType) {
      request = request.clone({
        setHeaders: {
          Authorization: `${tokenType} ${accessToken}`
        }
      });
    }
    const xsrf = sessionStorage.getItem('XSRF-TOKEN');
    return next.handle(request);
  }
}
