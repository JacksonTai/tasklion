import {Component, OnInit} from '@angular/core';
import {initFlowbite, initModals} from 'flowbite';
import {AppConstant} from "./shared/constants/app.constant";
import {ActivatedRoute, Event, NavigationEnd, Router} from "@angular/router";
import {RouteConstant} from "./shared/constants/route.constant";
import {filter} from "rxjs";

import {IStaticMethods} from 'preline/preline';
import HSTabs from "@preline/tabs";

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title: string = AppConstant.TASKLION;
  protected hideNavAndFooter: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    initFlowbite();
    initModals();
    this.router.events.subscribe((event: Event): void => {
      if (event instanceof NavigationEnd) {
        setTimeout((): void => {
          HSTabs.autoInit();
        }, 100);
      }
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((): void => {
      this.hideNavAndFooter = RouteConstant.headerFooterExcludedRoutes.some(
        (route: string): boolean => this.router.url.startsWith(`/${route}`)
      );
    });
  }

  private getCurrentRoutePath(): string {
    let currentRoute: string = '';
    let route = this.activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
      currentRoute = route.snapshot.routeConfig?.path || '';
    }
    return currentRoute;
  }

}
