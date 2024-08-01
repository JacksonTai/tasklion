import {Component, OnInit} from '@angular/core';
import {RouteConstant} from "../../../../shared/constants/route.constant";
import {NavigationEnd, Router} from "@angular/router";
import {filter, map, Observable, startWith} from "rxjs";

@Component({
  selector: 'tasklion-tasker-service-page',
  templateUrl: './tasker-service-page.component.html',
  styleUrls: ['./tasker-service-page.component.scss']
})
export class TaskerServicePageComponent implements OnInit {

  protected readonly RouteConstant = RouteConstant;
  protected username!: string;
  protected isTaskerServiceRoute$: Observable<boolean> | undefined;

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.initIsTaskerServiceRoute$();
  }

  initIsTaskerServiceRoute$(): void {
    this.isTaskerServiceRoute$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.isTaskerServiceRoute()),
      startWith(this.isTaskerServiceRoute())
    );
  }

  isTaskerServiceRoute(): boolean {
    return this.router.url === `/${RouteConstant.TASKER}/${RouteConstant.SERVICE}`;
  }

}
