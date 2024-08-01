import {Component, OnInit} from '@angular/core';
import {TaskerModel} from "../../models/tasker.model";
import {ActivatedRoute, Router} from "@angular/router";
import {TaskerService} from "../../services/tasker.service";
import {RouteConstant} from "src/app/shared/constants/route.constant";
import {finalize} from "rxjs";
import {ApiResponseModel} from "src/app/shared/models/api/api-response.model";
import {HttpStatusCode} from "@angular/common/http";
import {TasklionAccountModel} from 'src/app/modules/tasklion-account/models/tasklion-account.model';
import {PersonalDetailModel} from 'src/app/modules/tasklion-account/models/personal-detail.model';

@Component({
  selector: 'tasklion-tasker-detail-page',
  templateUrl: './tasker-detail-page.component.html',
  styleUrls: ['./tasker-detail-page.component.scss']
})
export class TaskerDetailPageComponent implements OnInit {

  protected readonly RouteConstant = RouteConstant;
  protected tasklionAccount!: TasklionAccountModel;
  protected personalDetail!: PersonalDetailModel;
  protected tasker!: TaskerModel;

  protected isUserDataLoading: boolean = true;

  constructor(
    protected router: Router,
    private activatedRoute: ActivatedRoute,
    private taskerService: TaskerService,
  ) {
  }

  ngOnInit(): void {
    const username: string | null = this.activatedRoute.snapshot.paramMap.get(RouteConstant.USERNAME)
    if (username) {
      this.isUserDataLoading = true;
      this.fetchTaskerData(username);
    }
  }

  fetchTaskerData(username: string): void {
    this.taskerService.getTasker(username)
      .pipe(finalize((): boolean => this.isUserDataLoading = false))
      .subscribe({
        next: (response: ApiResponseModel<any>) => this.handleUserResponse(response),
        error: error => this.handleError(error)
      });
  }

  handleUserResponse(response: ApiResponseModel<any>): void {
    this.tasklionAccount = response.data.tasklionAccount;
    this.personalDetail = response.data.personalDetail;
    this.tasker = response.data;
  }

  handleError(error: any): void {
    if (error.status === HttpStatusCode.NotFound) {
      this.router.navigate([RouteConstant.NOT_FOUND], {skipLocationChange: true});
    } else {
      console.error(error);
      this.router.navigate([RouteConstant.INTERNAL_SERVER_ERROR], {skipLocationChange: true});
    }
  }

}

