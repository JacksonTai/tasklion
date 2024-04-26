import {Component, OnInit} from '@angular/core';
import {initFlowbite} from 'flowbite';
import {AppConstant} from "./shared/constants/app.constant";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {RouteConstant} from "./shared/constants/route.constant";
import {filter} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title: string = AppConstant.TASKLION;
  hideNavAndFooter: boolean = false;

  private readonly headerFooterExcludedRoutes: string[] = [
    RouteConstant.LOGIN,
    RouteConstant.REGISTER
  ];

  ngOnInit(): void {
    initFlowbite();
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.hideNavAndFooter = this.headerFooterExcludedRoutes.includes(this.getCurrentRoutePath());
    });
  }

  private getCurrentRoutePath(): string {
    let currentRoute = '';
    let route = this.activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
      currentRoute = route.snapshot.routeConfig?.path || '';
    }
    return currentRoute;
  }

}
