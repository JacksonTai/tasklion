import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'tasklion-tasker-form',
  templateUrl: './tasker-form.component.html',
  styleUrls: ['./tasker-form.component.scss']
})
export class TaskerFormComponent implements OnInit {

  protected taskerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.initTaskerForm();
  }

  initTaskerForm(): void {
    this.taskerForm = this.formBuilder.group({
      personalDetails: new FormGroup({}),
      taskerDetails: new FormGroup({}),
      accountDetails: new FormGroup({}),
    });
  }

}
