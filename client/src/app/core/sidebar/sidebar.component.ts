import {Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../auth/services/auth.service';
import { MenuService } from '../services/menu.service';
import {TokenService} from "../../auth/services/token.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input()
  title: string = "Mantra";

  public isMenuActive: boolean;

  constructor(private auth: AuthService,
              private router: Router,
              private menu: MenuService,
              private token: TokenService) { }

  ngOnInit() {
    this.menu.menuActive
      .subscribe(active => this.isMenuActive = active);
  }

  get isAuth(): boolean {
    return this.auth.isLoggedIn();
  }

  logout(): void {
    this.token.removeToken();
    this.router.navigate(['/login']);
  }
}
