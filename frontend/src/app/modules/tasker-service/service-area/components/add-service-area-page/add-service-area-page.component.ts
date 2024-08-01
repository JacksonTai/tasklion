import {Component, OnInit} from '@angular/core';
import {RouteConstant} from "../../../../../shared/constants/route.constant";
import {FormGroup} from "@angular/forms";
import {finalize, Observable} from "rxjs";
import {FormStateService} from "../../../../../shared/services/form-state/form-state.service";
import {AuthService} from "../../../../../shared/services/auth/auth.service";
import {Router} from "@angular/router";
import {ServiceAreaService} from "../../services/service-area.service";
import FormUtil from "../../../../../shared/utils/form.util";
import {ServiceAreaFormConstant} from "../service-area-form/service-area-form.constant";

@Component({
  selector: 'tasklion-add-service-area-page',
  templateUrl: './add-service-area-page.component.html',
  styleUrls: ['./add-service-area-page.component.scss']
})
export class AddServiceAreaPageComponent implements OnInit {

  protected readonly RouteConstant = RouteConstant;
  protected serviceAreaForm!: FormGroup;
  protected serviceAreaForm$: Observable<FormGroup> = new Observable();
  protected errorResponseMessage: string = '';

  protected isLoading: boolean = false;
  protected isResponseError: boolean = false;

  constructor(
    private serviceAreaService: ServiceAreaService,
    private formStateService: FormStateService,
    private authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.initServiceAreaForm();
  }

  initServiceAreaForm(): void {
    this.serviceAreaForm$ = this.formStateService.getForm(ServiceAreaFormConstant.FORM_ID);
    this.serviceAreaForm$.subscribe((serviceAreaForm: FormGroup): void => {
      this.serviceAreaForm = serviceAreaForm;
    });
  }

  addServiceArea(): void {
    this.isResponseError = false;
    FormUtil.markAllFieldsAsDirty(this.serviceAreaForm);
    if (this.serviceAreaForm.invalid) {
      return;
    }
    this.isLoading = true;
    const username: string | undefined = this.authService.getJwtPayload()?.username;
    if (username) {
      this.serviceAreaService.createServiceArea(username, this.serviceAreaForm.value)
        .pipe(finalize((): boolean => this.isLoading = false))
        .subscribe({
          next: (): void => {
            this.router.navigate([`/${RouteConstant.SERVICE_AREA}`]);
          },
          error: (error: any): void => {
            this.isResponseError = true;
            this.errorResponseMessage = error.error.message
          }
        });
    }
  }

}
