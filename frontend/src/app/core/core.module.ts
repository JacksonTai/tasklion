import {NgModule} from '@angular/core';
import {ENVIRONMENT} from "../shared/services/environment/environment";
import {environment} from "../../environments/environment";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {Loader} from "@googlemaps/js-api-loader";
import {AuthInterceptor} from "./interceptors/auth/auth.interceptor";


@NgModule({
  providers: [
    {provide: ENVIRONMENT, useValue: environment},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {
      provide: Loader, useValue: new Loader({
        apiKey: environment.googleMapApiKey,
        libraries: ['places'],
      })
    },
  ],
})
export class CoreModule {
}
