import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from "../services/auth.service";

@Injectable()
export class UnauthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    // If user is already logged in, redirect to projects
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['projects']);
      return false;
    }
    return true;
  }
}
