import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'tasklion-search-tasker-form',
  templateUrl: './search-tasker-form.component.html',
  styleUrls: ['./search-tasker-form.component.scss']
})
export class SearchTaskerFormComponent implements OnInit{

  protected validationMessages: any = {};
  protected searchTaskerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.initSearchTaskerForm();
  }

  initSearchTaskerForm(): void {
    this.searchTaskerForm = this.formBuilder.group({
      search: [''],
    });
  }

}
