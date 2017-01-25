import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { SecurityService } from '../../shared/services/security.service';
import { UserManagementService } from '../../shared/services/user-management.service';

import { NgRedux, select } from 'ng2-redux';

import { User } from '../../shared/models/user.model';
import { UserAction } from '../../redux/actions/user.action';

@Component({
    selector: 'user-management',
    templateUrl: 'user-management.component.html',
    providers: [ UserAction ],
})

export class UserManagementComponent implements OnInit {

    public message: string;
    public Users: User[];
    @select() users$: Observable<any>;


    constructor(
        private _userManagementService: UserManagementService,
        public securityService: SecurityService,
        public _userActions: UserAction
    ) {
        this.message = 'user-management';
    }

    ngOnInit() {
        // this.getData();
        this._userActions.getUsers();
    }

    private getData() {
        console.log('User Management:getData starting...');
        this._userManagementService
            .GetAll()
            .subscribe(
                data => this.Users = data,
                error => this.securityService.HandleError(error),
            () => console.log('User Management Get all completed'));
    }

    public Update(user: User) {
        this._userManagementService.Update(user.id, user)
            .subscribe((() => console.log('subscribed')),
            error => this.securityService.HandleError(error),
            () => console.log('update request sent!'));
    }
}
