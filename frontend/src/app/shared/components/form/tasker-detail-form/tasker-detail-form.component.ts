import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'tasklion-tasker-detail-form',
  templateUrl: './tasker-detail-form.component.html',
  styleUrls: ['./tasker-detail-form.component.scss']
})
export class TaskerDetailFormComponent implements OnInit {

  protected taskerDetailForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.initTaskerDetailForm();
  }

  initTaskerDetailForm(): void {
    this.taskerDetailForm = this.formBuilder.group({
      aboutMe: new FormControl(''),
      services: new FormControl([]),
      address: new FormControl(null),
    });
  }

}
