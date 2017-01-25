import {
    GET_USERS   
} from './action.constant';

import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { UserManagementService } from '../../shared/services/user-management.service';

@Injectable()
export class UserAction {
constructor(
  private _ngRedux: NgRedux<any>,
  private _userManagement: UserManagementService) {} 

  getUsers = () => {
    return this._userManagement.GetAll().subscribe(data => {
      return this._ngRedux.dispatch({
        type: GET_USERS,
        payload: data
      });
    });
  };
 
}

