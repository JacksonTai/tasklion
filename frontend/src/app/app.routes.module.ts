import {NgModule} from '@angular/core';
import {TaskComponent} from "./components/task/task.component";
import {RegisterComponent} from "./components/register/register.component";
import {RouterModule, Routes} from "@angular/router";
import {LandingPageComponent} from "./components/landing-page/landing-page.component";
import {DevTemplateComponent} from "./shared/components/dev-template/dev-template.component";
import {LoginComponent} from "./components/login/login/login.component";

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'task', component: TaskComponent},
  {path: 'dev-template', component: DevTemplateComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutesModule {
}
