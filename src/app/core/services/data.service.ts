import { UtilityService } from './utility.service';
import { NotificationService } from './notification.service';
import { MessageConstants } from './../common/message.constants';
import { AuthenService } from './authen.service';
import { SystemConstants } from './../common/system.constants';
import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {
  private headers: Headers;

  constructor(
    private _http: Http,
    private _router: Router,
    private _authenService: AuthenService,
    private _notificationService: NotificationService,
    private _utilityService: UtilityService
  ) {}

  get(uri: string) {
    this.headers.delete('Authorization');
    this.headers.append(
      'Authorization',
      `Bearer ${this._authenService.getLoggedInUser().access_token}`
    );
    return this._http
      .get(`${SystemConstants.BASE_API}${uri}`, { headers: this.headers })
      .map(this.extractData);
  }

  post(uri: string, data?: any) {
    this.headers.delete('Authorization');
    this.headers.append(
      'Authorization',
      `Bearer ${this._authenService.getLoggedInUser().access_token}`
    );
    return this._http
      .post(`${SystemConstants.BASE_API}${uri}`, data, {
        headers: this.headers
      })
      .map(this.extractData);
  }

  put(uri: string, data?: any) {
    this.headers.delete('Authorization');
    this.headers.append(
      'Authorization',
      `Bearer ${this._authenService.getLoggedInUser().access_token}`
    );
    return this._http
      .put(`${SystemConstants.BASE_API}${uri}`, data, {
        headers: this.headers
      })
      .map(this.extractData);
  }

  delete(uri: string, key: string, id: string) {
    this.headers.delete('Authorization');
    this.headers.append(
      'Authorization',
      `Bearer ${this._authenService.getLoggedInUser().access_token}`
    );
    return this._http
      .delete(`${SystemConstants.BASE_API}${uri}/?${key}=${id}`, {
        headers: this.headers
      })
      .map(this.extractData);
  }

  postFile(uri: string, data?: any) {
    const newHeader = new Headers();
    newHeader.append(
      'Authorization',
      `Bearer ${this._authenService.getLoggedInUser().access_token}`
    );
    return this._http
      .post(`${SystemConstants.BASE_API}${uri}`, data, {
        headers: this.headers
      })
      .map(this.extractData);
  }

  private extractData(res: Response) {
    const body = res.json;
    return body || {};
  }

  public handleError(error: any) {
    if (error.status === 401) {
      localStorage.removeItem(SystemConstants.CURRENT_USER);
      this._notificationService.printErrorMessage(MessageConstants.LOGIN_AGAIN_MSG);
      this._utilityService.navigateToLogin();
    }else {
      const errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}: 'Lỗi hệ thống'`;
      this._notificationService.printErrorMessage(errMsg);
      return Observable.throw(errMsg);
    }
  }
}
