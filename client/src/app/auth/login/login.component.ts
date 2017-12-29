import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from "../services/auth.service";
import { ErrorsService } from '../../shared/errors.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public errors: string[];

  constructor(private auth: AuthService, private router: Router, private errorsService: ErrorsService) { }

  ngOnInit() {
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  navigateToForgotPassword() {
    this.router.navigate(['/forgot']);
  }

  onSubmit(email: string, password: string) {
    let user = { Email: email, Password: password };
    this.auth.login(user).subscribe(
      result => {
        this.router.navigate(['/']);
      },
      err => this.errors = this.errorsService.mapErrors(err, 'Login'));
  }
}
