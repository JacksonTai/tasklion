import {Component, OnInit} from '@angular/core';
import { initFlowbite } from 'flowbite';
import {AppConstant} from "./shared/constants/app.constant";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = AppConstant.TASKLION;

  ngOnInit(): void {
    initFlowbite();
  }
}
