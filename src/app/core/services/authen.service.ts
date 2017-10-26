import {LoggedInUser} from './../domain/loggedin.user';
import {SystemConstants} from './../common/system.constants';
import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenService {
    constructor(private _http: Http) {
    }

    login(username: string, password: string) {
        const body = `userName=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&grant_type=password`;
        console.log(body);
        const headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        const options = new RequestOptions({headers: headers});
        return this._http
            .post(`${SystemConstants.BASE_API}/api/oauth/token`, body, options)
            .map((response: Response) => {
                const user: LoggedInUser = response.json();
                if (user && user.access_token) {
                    localStorage.removeItem(SystemConstants.CURRENT_USER);
                    localStorage.setItem(SystemConstants.CURRENT_USER, JSON.stringify(user));
                }
            });
    }

    logout() {
    }

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
                userData.avatar,
                userData.roles,
                userData.permissions
            );
        } else {
            user = null;
        }
        return user;
    }

    checkAccess(functionID: string) {
        const user: LoggedInUser = this.getLoggedInUser();
        const result = false;
        const permissions: any[] = JSON.parse(user.permissions);
        const roles: any[] = JSON.parse(user.roles);
        const hasPermission: number = permissions.findIndex(x => x.FunctionId === functionID && x.CanRead === true);
        return hasPermission !== -1 || roles.findIndex(x => x === 'Admin') !== -1;
    }

    hasPermission(functionId: string, action: string): boolean {
        const user: LoggedInUser = this.getLoggedInUser();
        let result = false;
        const permissions: any[] = JSON.parse(user.permissions);
        const roles: any[] = JSON.parse(user.roles);
        let hasPermission: number;
        switch (action) {
            case 'create':
                hasPermission = permissions.findIndex(x => x.FunctionId === functionId && x.CanCreate === true);
                if (hasPermission !== -1 || roles.findIndex(x => x === 'Admin') !== -1) {
                    result = true;
                }
                break;
            case 'update':
                hasPermission = permissions.findIndex(x => x.FunctionId === functionId && x.CanUpdate === true);
                if (hasPermission !== -1 || roles.findIndex(x => x === 'Admin') !== -1) {
                    result = true;
                }
                break;
            case 'delete':
                hasPermission = permissions.findIndex(x => x.FunctionId === functionId && x.CanDelete === true);
                if (hasPermission !== -1 || roles.findIndex(x => x === 'Admin') !== -1) {
                    result = true;
                }
                break;
        }
        return result;
    }

}
