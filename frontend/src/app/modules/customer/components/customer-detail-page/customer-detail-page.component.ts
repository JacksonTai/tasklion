import {Component, OnInit} from '@angular/core';
import {TasklionAccountModel} from "../../../tasklion-account/models/tasklion-account.model";
import {PersonalDetailModel} from "../../../tasklion-account/models/personal-detail.model";
import {CustomerModel} from "../../models/customer.model";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerService} from "../../services/customer.service";
import {RouteConstant} from "../../../../shared/constants/route.constant";
import {finalize} from "rxjs";
import {ApiResponseModel} from "../../../../shared/models/api/api-response.model";
import {HttpStatusCode} from "@angular/common/http";

@Component({
  selector: 'tasklion-customer-detail-page',
  templateUrl: './customer-detail-page.component.html',
  styleUrls: ['./customer-detail-page.component.scss']
})
export class CustomerDetailPageComponent implements OnInit {

  protected tasklionAccount!: TasklionAccountModel;
  protected personalDetail!: PersonalDetailModel;
  protected customer!: CustomerModel;

  protected isFetchingData: boolean = true;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
  ) {
  }

  ngOnInit(): void {
    const profileParam: string | null = this.activatedRoute.snapshot.paramMap.get(RouteConstant.USERNAME)
    if (profileParam) {
      this.fetchCustomerData(profileParam);
    }
  }

  fetchCustomerData(username: string): void {
    this.isFetchingData = true;
    this.customerService.getCustomer(username)
      .pipe(finalize((): boolean => this.isFetchingData = false))
      .subscribe({
        next: (response: ApiResponseModel<any>) => {
          this.tasklionAccount = response.data.tasklionAccount;
          this.personalDetail = response.data.personalDetail;
          this.customer = response.data;
        },
        error: error => this.handleError(error)
      });
  }

  handleError(error: any): void {
    if (error.status === HttpStatusCode.NotFound) {
      this.router.navigate([RouteConstant.NOT_FOUND], {skipLocationChange: true});
    } else {
      this.router.navigate([RouteConstant.INTERNAL_SERVER_ERROR], {skipLocationChange: true});
    }
  }

}
