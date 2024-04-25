import {Inject, Injectable, Optional} from '@angular/core';
import {ENVIRONMENT} from "./environment";

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  private readonly environment: any;

  // Need @Optional to start app without providing environment file
  constructor(@Optional() @Inject(ENVIRONMENT) environment: any) {
    this.environment = environment !== null ? environment : {};
  }

  getValue(key: string, defaultValue?: any): any {
    console.log(key);
    console.log(this.environment[key]);
    return this.environment[key] || defaultValue;
  }
}
