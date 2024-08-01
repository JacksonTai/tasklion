import {Component, OnInit} from '@angular/core';

import {finalize, forkJoin} from "rxjs";
import {KeyValueModel} from "../../../../shared/models/key-value.model";
import {TaskerService} from "../../../tasker/services/tasker.service";
import {TaskService} from "../../../task/services/task.service";
import {CustomerService} from 'src/app/modules/customer/services/customer.service';
import {TaskerServiceService} from 'src/app/modules/tasker-service/services/tasker-service.service';

@Component({
  selector: 'tasklion-admin-statistic-page',
  templateUrl: './admin-statistic-page.component.html',
  styleUrls: ['./admin-statistic-page.component.scss']
})
export class AdminStatisticPageComponent implements OnInit {

  protected mostOfferedServices: KeyValueModel[] = [];
  protected totalCustomers: number = 0;
  protected totalTaskers: number = 0;
  protected isFetchingData: boolean = false;
  protected taskStatuses: any[] = [];

  protected donutData: any;
  protected donutOptions: any;
  protected barData: any;
  protected barOptions: any;

  constructor(
    private taskerServiceService: TaskerServiceService,
    private customerService: CustomerService,
    private taskerService: TaskerService,
    private taskService: TaskService,
  ) {
  }

  ngOnInit(): void {
    this.loadStatistics();
  }

  private loadStatistics(): void {
    this.isFetchingData = true;
    forkJoin({
      mostOfferedServices: this.taskerServiceService.getMostOfferedServices(),
      customerCount: this.customerService.getCustomerCount(),
      taskerCount: this.taskerService.getTaskerCount(),
      taskCountByStatus: this.taskService.getTaskCountByStatus()
    })
      .pipe(finalize((): boolean => this.isFetchingData = false))
      .subscribe({
        next: (response): void => {
          this.mostOfferedServices = response.mostOfferedServices.data;
          this.totalCustomers = response.customerCount.data;
          this.totalTaskers = response.taskerCount.data;
          this.taskStatuses = response.taskCountByStatus.data;
          this.updateChartData();
        }
      });
  }

  private updateChartData(): void {
    this.donutData = {
      labels: ['Taskers', 'Customers'],
      datasets: [
        {
          data: [this.totalTaskers, this.totalCustomers],
          backgroundColor: ['#42A5F5', '#66BB6A'],
          hoverBackgroundColor: ['#64B5F6', '#81C784']
        }
      ]
    };

    this.donutOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: "#495057",
          },
        },
      },
    };
    this.donutOptions = {
      responsive: true,
      maintainAspectRatio: false
    };

    const statusLabels = this.taskStatuses.map(status => status.field);
    const statusValues = this.taskStatuses.map(status => status.value);
    this.barData = {
      labels: statusLabels,
      datasets: [
        {
          label: 'Task Statuses',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: statusValues
        }
      ]
    };
    this.barOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          ticks: {
            beginAtZero: true
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    };
  }

}
