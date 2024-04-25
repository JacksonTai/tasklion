import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('Intercepted request:', request);
    const xsrf = sessionStorage.getItem('XSRF-TOKEN');

    const authReq = request.clone({
      // headers: request.headers.set('Authorization', authToken)
    });

    return next.handle(request);
  }
}
