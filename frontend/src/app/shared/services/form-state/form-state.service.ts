import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {map} from 'rxjs/operators';

interface FormState {
  form: FormGroup;
}

@Injectable({
  providedIn: 'root'
})
export class FormStateService {
  private formStateMap = new Map<string, BehaviorSubject<FormState>>();
  private formBuilder: FormBuilder;

  constructor() {
    this.formBuilder = new FormBuilder();
  }

  private getFormStateSubject(formId: string): BehaviorSubject<FormState> {
    if (!this.formStateMap.has(formId)) {
      const emptyForm: FormGroup = this.formBuilder.group({});
      this.formStateMap.set(formId, new BehaviorSubject<FormState>({form: emptyForm}));
    }
    return this.formStateMap.get(formId)!;
  }

  setForm(formId: string, form: FormGroup): void {
    this.getFormStateSubject(formId).next({form});
  }

  getForm(formId: string): Observable<FormGroup> {
    return this.getFormStateSubject(formId).asObservable().pipe(map(state => state.form));
  }

}
