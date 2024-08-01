import {Component, OnInit} from '@angular/core';
import {filter, map, Observable, startWith} from "rxjs";
import {RouteConstant} from 'src/app/shared/constants/route.constant';
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'tasklion-service-area-page',
  templateUrl: './service-area-page.component.html',
  styleUrls: ['./service-area-page.component.scss']
})
export class ServiceAreaPageComponent implements OnInit {

  protected readonly RouteConstant = RouteConstant;
  protected username!: string;
  protected isServiceAreaRoute$: Observable<boolean> | undefined;

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.initIsServiceAreaRoute$();
  }

  initIsServiceAreaRoute$(): void {
    this.isServiceAreaRoute$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.isServiceAreaRoute()),
      startWith(this.isServiceAreaRoute())
    );
  }

  isServiceAreaRoute(): boolean {
    return this.router.url === `/${RouteConstant.SERVICE_AREA}`;
  }


}
