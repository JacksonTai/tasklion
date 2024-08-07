import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {EnvironmentService} from "../environment/environment.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = this.environmentService.getValue("tasklionBackendUrl");

  constructor(
    private http: HttpClient,
    private environmentService: EnvironmentService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  get<T>(path: string, params?: HttpParams, headers?: HttpHeaders): Observable<T> {
    const url = this.getFullUrl(path);
    return this.http.get<T>(url, {params, headers}).pipe(
      catchError(this.handleError)
    );
  }

  post<T>(
    path: string,
    body?: any,
    options?: {
      body?: any;
      headers?: HttpHeaders | { [header: string]: string | Array<string> };
      observe?: any;
      params?: HttpParams | { [param: string]: string | Array<string> };
      reportProgress?: boolean;
      responseType?: any;
      withCredentials?: boolean;
    }
  ): Observable<any> {
    const url = this.getFullUrl(path);
    return this.http.post(url, body, options).pipe(
      catchError(this.handleError)
    );
  }

  put<T>(path: string, body: any, params?: HttpParams, headers?: HttpHeaders): Observable<T> {
    const url: string = this.getFullUrl(path);
    return this.http.put<T>(url, body, {params, headers}).pipe(
      catchError(this.handleError)
    );
  }

  delete<T>(path: string, body: any = {}, params?: HttpParams, headers?: HttpHeaders): Observable<T> {
    const url: string = this.getFullUrl(path);
    return this.http.request<T>('DELETE', url, { body, params, headers }).pipe(
      catchError(this.handleError)
    );
  }

  private getFullUrl(path: string): string {
    return `${this.baseUrl}${path}`;
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred.';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => error)
  }

  public getUrlParam(paramName: string): string | null {
    let redirectUrl: string | null = null;
    this.activatedRoute.queryParams.subscribe((params: Params): void => {
      if (params[paramName]) {
        redirectUrl = params[paramName];
      }
    });
    return redirectUrl;
  }

}
