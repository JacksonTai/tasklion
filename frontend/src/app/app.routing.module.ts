import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {RouteConstant} from "./shared/constants/route.constant";
import {PageNotFoundComponent} from './shared/components/page/page-not-found/page-not-found.component';
import {
  InternalServerErrorPageComponent
} from './shared/components/page/internal-server-error-page/internal-server-error-page.component';

const routes: Routes = [
  {
    path: '**',
    pathMatch: 'full',
    component: PageNotFoundComponent
  },
  {
    path: RouteConstant.INTERNAL_SERVER_ERROR,
    pathMatch: 'full',
    component: InternalServerErrorPageComponent
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
