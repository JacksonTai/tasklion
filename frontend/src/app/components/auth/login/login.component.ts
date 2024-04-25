import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../shared/services/auth/auth.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {finalize} from "rxjs";

@Component({
    selector: 'tasklion-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm!: FormGroup;
    isLoading: boolean = false;
    isLoginFailed: boolean = false;

    validationMessages = {
        email: {
            required: 'Email is required',
            invalid: 'Please provide a valid email',
        },
        password: {
            required: 'Password is required',
        }
    };

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private authService: AuthService,
    ) {
    }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    login() {
        if (this.loginForm.valid) {
            this.isLoading = true;
            this.authService.login(this.loginForm.value)
                .pipe(
                    finalize(() => {
                        this.isLoading = false;
                    })
                )
                .subscribe({
                    next: (response) => {
                        this.isLoginFailed = false;
                        // window.sessionStorage.setItem("XSRF-TOKEN", getCookie('XSRF-TOKEN'));
                        console.log('Login response:', response);
                    },
                    error: (error) => {
                        this.isLoginFailed = true;
                    }
                });
        }
    }

}
