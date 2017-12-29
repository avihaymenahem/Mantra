import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { AppConfig } from '../app.config';
import { TokenService } from '../auth/services/token.service';

export interface RequestOptions {
  uri: string;
  method: string;
  params?: HttpParams;
  body?: any;
  headers?: HttpHeaders;
  withAuthorization?: boolean;
}

@Injectable()
export class ApiService {
  private apiUrl: string;

  constructor(private httpClient: HttpClient, private token: TokenService) {
    this.apiUrl = AppConfig.apiUrl;
  }

  getHeaders(withAuthorization: boolean) {
    if (withAuthorization === undefined) {
      withAuthorization = true;
    }

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json');
    if (withAuthorization) {
      headers = headers.set('Authorization', `Bearer ${this.token.getToken()}`);
    }
    return headers;
  }

  request(options: RequestOptions): Observable<any> {
    let url = `${this.apiUrl}${options.uri}`;
    let method = options.method || 'GET';
    let headers = options.headers || this.getHeaders(options.withAuthorization);

    return this.httpClient.request(method, url, {
        headers: headers,
        params: options.params || null,
        body: options.body || null
      })
      .catch(err => {
        if (err.status <= 0) {
          console.error(err);
          return Observable.throw('internal error');
        }
        return Observable.throw(err.json().meta.error);
      });
  }

  requestDownload(options: RequestOptions): Observable<any> {
    let request = new HttpRequest(options.method || 'GET', `${this.apiUrl}${options.uri}`, {
      headers: options.headers || this.getHeaders(options.withAuthorization),
      params: options.body,
      responseType: 'blob'
    });
    return this.httpClient.request(request)
      .catch(err => { console.error(err); return Observable.throw(err); });
  }

  mapErrors(error: any): string[] {
    switch (error.type) {
      case "ValidationFailure":
        return error.errors.map(err => err.message);
      case "AlreadyExists":
        return [error.message];
      case "Unauthorized":
        return [error.message];
      default:
        return ['Something went wrong. That\'s all we know\'.'];
    }
  }
}
