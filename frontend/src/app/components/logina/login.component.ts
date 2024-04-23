import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'tasklion-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email: string = '';
  password: string = '';


  constructor(private authService: AuthService, private router: Router) {
  }

  onSubmit(): void {
    if (this.authService.login(this.email, this.password)) {
      this.router.navigate(['/']);
    } else {
      alert('Invalid email or password');
    }
  }
}
