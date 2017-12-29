import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';

import { TokenService } from './token.service';
import { ApiService } from '../../shared/api.service';
import { User } from '../../users/models/user';

@Injectable()
export class AuthService {

  private tokenName: string = 'auth.token';

  constructor(private api: ApiService,
              private token: TokenService) {

  }

  isLoggedIn(): boolean {
    let token = this.token.getToken();
    return tokenNotExpired(null, token);
  }

  login(user: User): Observable<boolean> {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.api.request({
      uri: '/users/login',
      method: 'POST',
      headers: headers,
      body: {email: user.Email, password: user.Password},
      withAuthorization: false,
    })
      .map(res => {
        let token = res.token;

        if (!token) {
          throw new Error("no token in response");
        }

        this.token.storeToken(token);
        return true;
      });
  }

  register(user: User): Observable<boolean> {
    return this.api.request({
      uri: '/users/register',
      method: 'POST',
      body: JSON.stringify({ name: user.Username, email: user.Email, password: user.Password }),
      withAuthorization: false,
    })
      .map(res => {
        let meta = res.meta;
        if (!meta) {
          throw new Error("no meta in response");
        }

        return !(meta.status < 200 || meta.status > 300);
      });
  }

}
