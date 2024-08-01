import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from "./header/header.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {FooterComponent} from "./footer/footer.component";
import {SharedContentModule} from "../content/shared-content.module";
import {SharedModule} from "../../shared.module";

const sharedLayoutComponents = [
  HeaderComponent,
  NavbarComponent,
  FooterComponent,
]

@NgModule({
  declarations: sharedLayoutComponents,
  imports: [
    CommonModule,
    SharedContentModule,
    SharedModule
  ],
  exports: sharedLayoutComponents
})
export class SharedLayoutModule {
}
