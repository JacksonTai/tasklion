import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'tasklion-customer-form',
  templateUrl: './customer-form.html',
  styleUrls: ['./customer-form.component.scss'],
})
export class CustomerFormComponent implements OnInit {

  protected customerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      personalDetails: new FormGroup({}),
      accountDetails: new FormGroup({})
    });
  }

}

