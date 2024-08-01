import {Component, OnInit} from '@angular/core';
import {RouteConstant} from "../../../../shared/constants/route.constant";
import {filter, map, Observable, startWith} from "rxjs";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'tasklion-tasker-availability-page',
  templateUrl: './tasker-availability-page.component.html',
  styleUrls: ['./tasker-availability-page.component.scss']
})
export class TaskerAvailabilityPageComponent implements OnInit{

  protected readonly RouteConstant = RouteConstant;
  protected isTaskerAvailabilityRoute$: Observable<boolean> | undefined;

  protected isFetchingData: boolean = true;

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.initIsTaskerServiceRoute$();
  }

  initIsTaskerServiceRoute$(): void {
      this.isTaskerAvailabilityRoute$ = this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.isTaskerAvailabilityRoute()),
        startWith(this.isTaskerAvailabilityRoute())
      );
  }

  isTaskerAvailabilityRoute(): boolean {
    return this.router.url === `/${RouteConstant.TASKER}/${RouteConstant.AVAILABILITY}`;
  }

}
