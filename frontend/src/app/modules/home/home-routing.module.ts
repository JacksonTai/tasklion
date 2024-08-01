import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppConstant} from "../../shared/constants/app.constant";
import {RouteConstant} from "../../shared/constants/route.constant";
import {HomePageComponent} from "./home-page/home-page.component";
import {NoAuthGuard} from 'src/app/shared/guards/no-auth/no-auth.guard';

const routes: Routes = [
  {
    title: AppConstant.TASKLION,
    path: RouteConstant.ROOT,
    component: HomePageComponent,
    canActivate: [NoAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
