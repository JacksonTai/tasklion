import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {ChartModule} from "primeng/chart";
import {AdminLoginPageComponent} from "./components/admin-login-page/admin-login-page.component";
import {AdminManageUserComponent} from "./components/admin-manage-user/admin-manage-user.component";
import {AdminStatisticPageComponent} from "./components/admin-statistic-page/admin-statistic-page.component";
import {SharedContentModule} from "../../shared/components/content/shared-content.module";
import {SharedFormModule} from "../../shared/components/form/shared-form.module";
import {SharedModule} from "../../shared/shared.module";
import {ModalModule} from "../../shared/components/modal/modal.module";
import {AdminAddUserPageComponent} from './components/admin-add-user-page/admin-add-user-page.component';
import {AdminManageUserListComponent} from './components/admin-manage-user-list/admin-manage-user-list.component';
import {SharedButtonsModule} from "../../shared/components/buttons/shared-buttons.module";
import {CustomerModule} from "../customer/customer.module";

@NgModule({
  declarations: [
    AdminLoginPageComponent,
    AdminManageUserComponent,
    AdminStatisticPageComponent,
    AdminAddUserPageComponent,
    AdminManageUserListComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedContentModule,
    SharedFormModule,
    ChartModule,
    SharedModule,
    ModalModule,
    SharedButtonsModule,
    CustomerModule,
  ]
})
export class AdminModule { }
