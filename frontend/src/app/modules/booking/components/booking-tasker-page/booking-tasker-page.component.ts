import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {TaskerService} from "../../../tasker/services/tasker.service";
import {SearchTaskerRequestModel} from 'src/app/modules/customer/models/search-tasker-request.model';
import {ApiResponseModel} from 'src/app/shared/models/api/api-response.model';
import {debounceTime, distinctUntilChanged, finalize} from "rxjs";
import {SearchTaskerResponseModel} from "../../../customer/models/search-tasker-response.model";
import {RouteConstant} from "../../../../shared/constants/route.constant";
import {PaginationModel} from "../../../../shared/models/pagination/pagination.model";
import {PaginationRequestModel} from "../../../../shared/models/pagination/pagination-request.model";
import PaginatorUtil from "../../../../shared/utils/paginator.util";
import {DatePipe} from "@angular/common";
import {DateTimeUtil} from "../../../../shared/utils/datetime.util";

@Component({
  selector: 'tasklion-booking-tasker-page',
  templateUrl: './booking-tasker-page.component.html',
  styleUrls: ['./booking-tasker-page.component.scss'],
  providers: [DatePipe]
})
export class BookingTaskerPageComponent implements OnInit {

  protected readonly RouteConstant = RouteConstant;

  protected taskersPagination: PaginationModel<SearchTaskerResponseModel> = new PaginationModel();
  protected pagination?: PaginationRequestModel;
  protected taskers: SearchTaskerResponseModel[] = [];
  protected searchRequest: any = {} as SearchTaskerRequestModel;
  protected searchForm!: FormGroup;

  protected times: string[] = ["I'm flexible"];
  protected today: Date = new Date();
  protected minDate: Date = this.today.getHours() >= 21 ? DateTimeUtil.addDays(this.today, 1) : this.today;
  protected maxDate: Date = DateTimeUtil.addDays(this.today, 14);

  protected isFetchingData: boolean = true;

  constructor(
    private taskerService: TaskerService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.initTimes();
    this.route.queryParams
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
      )
      .subscribe((params: Params) => this.fetchTaskersData(params));
  }

  initForm(): void {
    this.searchForm = this.formBuilder.group({
      dateRange: [null],
      morning: [false],
      afternoon: [false],
      evening: [false],
      specificTime: ['I\'m flexible']
    });
    this.readUrlParameters();
    this.searchForm.get('specificTime')?.valueChanges.subscribe(value => {
      if (value !== 'I\'m flexible') {
        this.searchForm.patchValue({
          morning: false,
          afternoon: false,
          evening: false
        }, {emitEvent: false});
        this.searchRequest.timeOfDay = [];
        this.searchRequest.time = value;
      } else {
        this.searchRequest.time = null;
      }
      this.fetchTaskersData();
    });
    this.searchForm.get('dateRange')?.valueChanges.subscribe(value => {
      if (value && value[0] && value[1]) {
        this.searchRequest.startDate = this.datePipe.transform(value[0], 'yyyy-MM-dd');
        this.searchRequest.endDate = this.datePipe.transform(value[1], 'yyyy-MM-dd');
        this.fetchTaskersData();
      } else if (!value) {
        this.searchRequest.startDate = null;
        this.searchRequest.endDate = null;
        this.fetchTaskersData();
      }
    })
  }

  initTimes(): void {
    for (let hour = 6; hour <= 21; hour++) {
      this.times.push(this.formatTime(hour, 0));
      if (hour !== 21) {
        this.times.push(this.formatTime(hour, 30));
      }
    }
  }

  formatTime(hour: number, minutes: number): string {
    let period: string = 'AM';
    if (hour >= 12) {
      period = 'PM';
      if (hour > 12) {
        hour -= 12;
      }
    } else if (hour === 0) {
      hour = 12;
    }
    let formattedMinutes: string = minutes < 10 ? '0' + minutes : minutes.toString();
    return `${hour}:${formattedMinutes} ${period}`;
  }

  fetchTaskersData(params?: any): void {
    this.updateUrlParameters();
    if (params !== undefined) {
      const serviceCategory = params['serviceCategory'];
      const state = params['state'];
      const city = params['city'];
      const postcode = params['postcode'];
      const duration = params['duration'];
      const searchTaskerRequest: SearchTaskerRequestModel = {
        serviceCategory: serviceCategory,
        state: state,
        city: city,
        postcode: postcode,
        duration: duration,
        timeOfDay: [],
        page: 0,
        size: 10
      };
      if (this.searchRequest.timeOfDay) {
        searchTaskerRequest.timeOfDay = this.searchRequest.timeOfDay;
      }
      if (this.searchRequest.startDate && this.searchRequest.endDate) {
        searchTaskerRequest.startDate = this.searchRequest.startDate;
        searchTaskerRequest.endDate = this.searchRequest.endDate;
      }
      if (this.searchRequest.time) {
        searchTaskerRequest.time = this.searchRequest.time;
      }
      if (this.pagination) {
        searchTaskerRequest.page = this.pagination.page;
        searchTaskerRequest.size = this.pagination.size;
      }
      this.isFetchingData = true;
      this.taskerService.searchTasker(searchTaskerRequest)
        .pipe(finalize((): boolean => this.isFetchingData = false))
        .subscribe((response: ApiResponseModel<any>): void => {
          this.taskers = response.data.content ?? [];
          PaginatorUtil.mapDataToPagination(this.taskersPagination, response.data);
        });
    }
  }

  readUrlParameters(): void {
    const params: Params = this.route.snapshot.queryParams;

    if (params['startDate'] && params['endDate']) {
      this.searchForm.patchValue({
        dateRange: [new Date(params['startDate']), new Date(params['endDate'])]
      });
    }

    if (params['time']) {
      this.searchForm.patchValue({
        specificTime: params['time']
      });
    }

    if (params['timeOfDay']) {
      const timeOfDay = params['timeOfDay'].split(',');
      this.searchForm.patchValue({
        morning: timeOfDay.includes('morning'),
        afternoon: timeOfDay.includes('afternoon'),
        evening: timeOfDay.includes('evening')
      });
      this.searchRequest.timeOfDay = timeOfDay;
    } else {
      this.searchRequest.timeOfDay = [];
    }

    if (params['page'] && params['size']) {
      this.pagination = {
        page: Number(params['page']),
        size: Number(params['size'])
      };
    }
  }

  updateUrlParameters(): void {
    const queryParams: any = {};

    if (this.searchRequest.startDate && this.searchRequest.endDate) {
      queryParams['startDate'] = this.searchRequest.startDate;
      queryParams['endDate'] = this.searchRequest.endDate;
    } else {
      queryParams['startDate'] = null;
      queryParams['endDate'] = null;
    }

    if (this.searchRequest.time && this.searchRequest.time !== 'I\'m flexible') {
      queryParams['time'] = this.searchRequest.time;
    } else {
      queryParams['time'] = null;
    }

    if (this.searchRequest.timeOfDay && this.searchRequest.timeOfDay.length > 0) {
      queryParams['timeOfDay'] = this.searchRequest.timeOfDay.join(',');
    } else {
      queryParams['timeOfDay'] = null;
    }

    if (this.pagination) {
      queryParams['page'] = this.pagination.page;
      queryParams['size'] = this.pagination.size;
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    });
  }

  goToDashboard(): void {
    const queryParams: Params = this.route.snapshot.queryParams;
    this.router.navigate([RouteConstant.CUSTOMER, RouteConstant.DASHBOARD], {queryParams});
  }

  onCheckboxChange(event: any, timeOfDay: string): void {
    if (event.target.checked) {
      this.searchForm.get('specificTime')?.setValue('I\'m flexible', {emitEvent: false});
      this.searchRequest.time = null;
      if (!this.searchRequest.timeOfDay) {
        this.searchRequest.timeOfDay = [];
      }
      this.searchRequest.timeOfDay.push(timeOfDay);
    } else {
      const index = this.searchRequest.timeOfDay.indexOf(timeOfDay);
      if (index > -1) {
        this.searchRequest.timeOfDay.splice(index, 1);
      }
    }
    this.fetchTaskersData();
  }

  onPageChange(pagination: PaginationRequestModel): void {
    this.pagination = pagination;
    this.fetchTaskersData();
  }

  onSelectTasker(tasker: any): void {
    const queryParams = {
      serviceCategory: this.route.snapshot.queryParamMap.get('serviceCategory'),
      state: this.route.snapshot.queryParamMap.get('state'),
      city: this.route.snapshot.queryParamMap.get('city'),
      postcode: this.route.snapshot.queryParamMap.get('postcode'),
      duration: this.route.snapshot.queryParamMap.get('duration'),
      tasker: tasker.username
    };

    this.router.navigate(
      [`/${RouteConstant.BOOKING}/${RouteConstant.CONFIRM}`],
      { queryParams }
    );
  }

}
