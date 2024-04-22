import {NgModule} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";

const MaterialModules = [
  MatButtonModule,
  MatSlideToggleModule,
  MatButtonModule,
  MatDividerModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule
];

@NgModule({
  imports: [MaterialModules],
  exports: [MaterialModules]
})
export class MaterialModule {
}
