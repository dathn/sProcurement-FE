import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { SystemConstants } from '../../core/common/system.constants';
import { LoggedInUser } from '../domain/loggedin.user';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenService {

  constructor(private _http: Http) { }
  login(username: string, password: string) {
    let body = 'username=' + encodeURIComponent(username) +
      '&password=' + encodeURIComponent(password) +
      '&grant_type=password';
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });

    return this._http.post(SystemConstants.BASE_API + '/api/oauth/token', body, options).map((response: Response) => {
      let user: LoggedInUser = response.json();
      if (user && user.access_token) {
        localStorage.removeItem(SystemConstants.CURRENT_USER);
        localStorage.setItem(SystemConstants.CURRENT_USER, JSON.stringify(user));
      }
    });
  }
  logout() {
    localStorage.removeItem(SystemConstants.CURRENT_USER);
  }

  isUserAuthenticated(): boolean {
    let user = localStorage.getItem(SystemConstants.CURRENT_USER);
    if (user != null) {
      return true;
    } else {
      return false;
    }
  }
  getLoggedInUser(): LoggedInUser {
    let user: LoggedInUser;
    if (this.isUserAuthenticated()) {
      let userData = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
      user = new LoggedInUser(userData.access_token, userData.UserId, userData.username, userData.FullName, userData.Firstname,
        userData.Lastname, userData.email, userData.avatar, userData.roles);
    } else {
      user = null;
    }
    return user;
  }
  checkAccess(action: string) {
    var user = this.getLoggedInUser();
    var result: boolean = false;
    var roles: any[] = JSON.parse(user.roles);
    switch (action) {
      case 'createPR':
        if (roles.findIndex(x => x === 'Inventory Manager') !== -1 || roles.findIndex(x => x === 'Procurement Manager') !== -1 || roles.findIndex(x => x === 'Procurement Staff') !== -1) {
          result = false;
        } else if (roles.findIndex(x => x === 'Inventory Staff') !== -1) {
          result = true;
        }
        break;
      case 'createPO':
        if (roles.findIndex(x => x === 'Inventory Manager') !== -1 || roles.findIndex(x => x === 'Procurement Manager') !== -1 || roles.findIndex(x => x === 'Inventory Staff') !== -1) {
          result = false;
        } else if (roles.findIndex(x => x === 'Procurement Staff') !== -1) {
          result = true;
        }
        break;
      case 'showDeletedFilesPR':
        if (roles.findIndex(x => x === 'Procurement Staff') !== -1 || roles.findIndex(x => x === 'Procurement Manager') !== -1 || roles.findIndex(x => x === 'Inventory Manager') !== -1 || roles.findIndex(x => x === 'Inventory Staff') !== -1) {
          result = true;
        }
        break;
      case 'showDeletedFilesPO':
        if (roles.findIndex(x => x === 'Procurement Staff') !== -1 || roles.findIndex(x => x === 'Procurement Manager') !== -1) {
          result = true;
        }
        break;
      case 'sendMail-gen-import':
        if (roles.findIndex(x => x === 'Procurement Manager') !== -1 || roles.findIndex(x => x === 'Procurement Staff') !== -1) {
          result = true;
        }
        break;
      case 'compare':
        if (roles.findIndex(x => x === 'Procurement Manager') !== -1 || roles.findIndex(x => x === 'Procurement Staff') !== -1) {
          result = true;
        }
        break;
      case 'deny-approve':
        if (roles.findIndex(x => x === 'Inventory Manager') !== -1 || roles.findIndex(x => x === 'Procurement Manager') !== -1) {
          result = true;
        }
        break;
      case 'downloadRFQ':
        if (roles.findIndex(x => x === 'Procurement Manager') !== -1 || roles.findIndex(x => x === 'Procurement Staff') !== -1) {
          result = true;
        }
        break;
      case 'submit-delete-draft':
        if (roles.findIndex(x => x === 'Inventory Staff') !== -1) {
          result = true;
        }
        break;
      case 'pro-submit-delete-draft':
        if (roles.findIndex(x => x === 'Procurement Staff') !== -1) {
          result = true;
        }
        break;
      case 'procurement-approved':
        if (roles.findIndex(x => x === 'Procurement Manager') !== -1 || roles.findIndex(x => x !== 'Procurement Staff') === -1) {
          result = true;
        }
        break;
      case 'inventory-tab':
        if (roles.findIndex(x => x === 'Inventory Manager') !== -1 || roles.findIndex(x => x === 'Inventory Staff') !== -1) {
          result = true;
        }
        break;
      case 'pro-tab':
        if (roles.findIndex(x => x === 'Procurement Manager') !== -1 || roles.findIndex(x => x === 'Procurement Staff') !== -1) {
          result = true;
        }
        break;
      case 'done-deleted':
        if (roles.findIndex(x => x === 'Inventory Staff') !== -1) {
          result = true;
        }
        break;

      case 'done-deleted-PO':
        if (roles.findIndex(x => x === 'Procurement Staff') !== -1) {
          result = true;
        }
        break;
      case 'done-tab':
        if (roles.findIndex(x => x === 'Procurement Manager') !== -1 || roles.findIndex(x => x === 'Procurement Staff') !== -1 || roles.findIndex(x => x === 'Inventory Manager') !== -1) {
          result = true;
        }
        break;
      case 'done-tab-PO':
        if (roles.findIndex(x => x === 'Procurement Manager') !== -1) {
          result = true;
        }
        break;
      case 'btn-PR':
        if (roles.findIndex(x => x === 'Procurement Manager') !== -1 || roles.findIndex(x => x === 'Procurement Staff') !== -1 ||
          roles.findIndex(x => x === 'Inventory Manager') !== -1 || roles.findIndex(x => x === 'Inventory Staff') !== -1) {
          result = true;
        }
        break;
      case 'ProcurementManager':
        if (roles.findIndex(x => x === 'Procurement Manager') !== -1) {
          result = true;
        }
        break;
      case 'showDeletedFilesContract':
        if (roles.findIndex(x => x === 'Procurement Staff') !== -1) {
          result = true;
        }
        break;
    }
    return result;
  }
}
