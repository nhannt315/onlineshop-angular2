import { LoggedInUser } from './../domain/loggedin.user';
import { SystemConstants } from './../common/system.constants';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenService {
  constructor(private _http: Http) {}

  login(username: string, password: string) {
    const body = `userName=${encodeURIComponent(username)}
    &password=${encodeURIComponent(password)}
    &grant_type=password`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = new RequestOptions({ headers: headers });
    return this._http
      .post(`${SystemConstants.BASE_API}/api/oauth/token`, body, options)
      .map((respone: Response) => {
        const user: LoggedInUser = respone.json();
        if (user && user.access_token) {
          localStorage.removeItem(SystemConstants.CURRENT_USER);
          localStorage.setItem(
            SystemConstants.CURRENT_USER,
            JSON.stringify(user)
          );
        }
      });
  }

  logout() {}

  isUserAuthenticated(): boolean {
    const user = localStorage.getItem(SystemConstants.CURRENT_USER);
    return user ? true : false;
  }

  getLoggedInUser(): any {
    let user: LoggedInUser;
    if (this.isUserAuthenticated()) {
      const userData = JSON.parse(
        localStorage.getItem(SystemConstants.CURRENT_USER)
      );
      user = new LoggedInUser(
        userData.access_token,
        userData.username,
        userData.fullName,
        userData.email,
        userData.avatar
      );
    } else {
      user = null;
    }
    return user;
  }
}
